import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateToken } from "../../utils/generateToken.js";
import User from "../../models/user.model.js";
import Equipment from "../../models/equipment.model.js";
import CONFIG from "../../config/config.js";

export const userRegister = asyncHandler(async (req, res) => {
  let { name, phoneNo, email, password, govtID, role } = req.body;

  //Check for Duplication of email in users collection
  let emailFound = await User.findOne({ email: req.body.email });
  if (emailFound) {
    return res.status(409).send("User email already registered");
  }

  //Check for Duplication of phoneNo
  let phoneNoFound = await User.find({ phoneNo: req.body.phoneNo });
  if (phoneNoFound.length) {
    return res.status(409).send("User phone already registered");
  }

  let userData = {
    name,
    phoneNo,
    email,
    password: await bcrypt.hash(password, 5),
    phoneToken: uuidv4(),
    emailToken: uuidv4(),
    isEmailVerified: false,
    isPhoneVerified: false,
    govtID,
    role,
  };

  //write to database
  await User.create(userData);

  res.status(200).send("User Registered Successfully");

  // const emailVerifyLink = `${CONFIG.BASE_URL}/api/user/verify/email/${userData.emailToken}`;
  // const phoneVerifyLink = `${CONFIG.BASE_URL}/api/user/verify/phone/${userData.phoneToken}`;

  //TODO: send the phone verification link through SMS
  //TODO: send the email verification link through email
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //readFile find the email,
  let userData = await User.findOne({ email: email });
  if (!userData) {
    return res.status(401).send("Invalid Credentials");
  }

  // compare the password with hash password
  let matchPassword = await bcrypt.compare(password, userData.password);

  if (!matchPassword) {
    return res.status(401).send("Invalid Credentials");
  }

  if (!userData.isEmailVerified) {
    return res.status(401).send("Please Verify your Email");
  }

  if (!userData.isPhoneVerified) {
    return res.status(401).send("Please Verify your Phone Number");
  }

  //if compare function return true, you will generate a JWT token
  let payload = {
    userId: userData._id,
    role: userData.role,
  };

  const token = generateToken(payload);

  res
    .status(200)
    .json({ msg: "User Login Successfully", token, user: userData });
});

export const verifyPhone = asyncHandler(async (req, res) => {
  const { phoneToken } = req.params;

  //find the user with that phone token
  let userData = await User.findOne(
    { phoneToken: req.params.phoneToken },
    "isPhoneVerified"
  );
  if (!userData) {
    return res.status(409).send("User doesn't exists");
  }

  //already true
  if (userData.isPhoneVerified) {
    return res.status(200).send("Phone already verified");
  }

  //update the isPhoneVerified boolean value
  userData.isPhoneVerified = true;

  //save to db
  await userData.save();

  res.status(200).send("Phone has been verified");
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { emailToken } = req.params;
  //find the user with that phone token
  let userData = await User.findOne(
    { emailToken: req.params.emailToken },
    "isEmailVerified"
  );
  if (!userData) {
    return res.status(409).send("User doesn't exists");
  }

  //already true
  if (userData.isEmailVerified) {
    return res.status(200).send("Email already verified");
  }

  //update the isEmailVerified boolean value
  userData.isEmailVerified = true;

  //save to db
  await userData.save();

  res.status(200).send("Email has been verified");
});

export const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(200).send({ isAuthorized: false });
  }

  const JWT_SECRET_KEY = CONFIG.JWT_SECRET_KEY;
  let decodedPayload = jwt.verify(token, JWT_SECRET_KEY);

  //find the user with that phone token
  let userData = await User.findById(decodedPayload.userId);
  if (!userData) {
    return res.status(200).send({ isAuthorized: false });
  }

  return res.status(200).send({ isAuthorized: true });
});

// return all user data to be displayed in dashboard
export const userDashboard = asyncHandler(async (req, res) => {
  let userData = await User.findById(req.payload.userId);
  if (!userData) {
    return res.status(409).send("User not found!");
  }
  res.status(200).json({ user: userData });
});

//--------------- WISHLIST CRUD ---------------//

export const getWishlist = asyncHandler(async (req, res) => {
  try {
    const userWishlist = await User.findById(req.payload.userId)
      .select("-_id  wishlist")
      .populate("wishlist");
    return res.status(200).send(userWishlist);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// add equipment to user's wishlist
export const addToWishlist = asyncHandler(async (req, res) => {
  try {
    let equipment = await Equipment.findById({ _id: req.params.equipmentId });

    if (!equipment) {
      return res.status(404).send("Equipment does not exist.");
    }

    await User.updateOne(
      { _id: req.payload.userId },
      { $addToSet: { wishlist: equipment } }
    );

    res.status(200).send("Added to wishlist!");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

// remove equipment from user's wishlist
export const removeFromWishlist = asyncHandler(async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.payload.userId },
      { $pull: { wishlist: req.params.equipmentId } }
    );
    res.status(200).send("Equipment removed from wishlist!");
  } catch (error) {
    console.log(error);
  }
});
