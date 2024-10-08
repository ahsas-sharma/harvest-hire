import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";

const JWT_SECRET_KEY = CONFIG.JWT_SECRET_KEY;

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    var decodedPayload = jwt.verify(token, JWT_SECRET_KEY);

    req.payload = decodedPayload;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorised Access");
  }
}
