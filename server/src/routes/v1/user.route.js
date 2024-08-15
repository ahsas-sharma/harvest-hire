import express from "express";
import {
  userLogin,
  userRegister,
  verifyEmail,
  verifyPhone,
  verifyToken,
  userDashboard,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../controllers/v1/user.controller.js";

import {
  registerValidation,
  loginValidation,
  handleValidationErrors,
} from "../../middleware/validation.js";
import { authMiddleware } from "../../middleware/verifyToken.js";

const router = express.Router();

/*
    DESC: Register a User
    METHOD: POST
    API_ENDPOINT: /api/user/register
*/
router.post(
  "/register",
  registerValidation(),
  handleValidationErrors,
  userRegister
);

/*
    DESC: login
    METHOD: POST
    API_ENDPOINT: /api/user/login
*/
router.post("/login", loginValidation(), handleValidationErrors, userLogin);

/*

    DESC: Verifying Phone Number
    METHOD: GET
    API_ENDPOINT: /api/user/verify/phone/:phoneToken
*/
router.get("/verify/phone/:phoneToken", verifyPhone);

/*
    DESC: Verifying Email
    METHOD: GET
    API_ENDPOINT: /api/user/verify/email/:emailToken
*/
router.get("/verify/email/:emailToken", verifyEmail);

/*
    DESC: Get all data for user
    METHOD: GET
    API_ENDPOINT: /api/user/dashboard
*/
router.get("/dashboard", authMiddleware, userDashboard);

router.post("/verify/auth", verifyToken);

//--------------- WISHLIST CRUD ---------------//

/*
    DESC: Get wishlist
    METHOD: GET
    API_ENDPOINT: /api/user/wishlist
*/
router.get("/wishlist", authMiddleware, getWishlist);

/*
    DESC: Add equipment to wishlist
    METHOD: POST
    API_ENDPOINT: /api/user/wishlist/add
*/
router.post("/wishlist/add/:equipmentId", authMiddleware, addToWishlist);

/*
    DESC: Remove equipment from wishlist
    METHOD: DELETE
    API_ENDPOINT: /api/user/wishlist/remove
*/

router.delete(
  "/wishlist/remove/:equipmentId",
  authMiddleware,
  removeFromWishlist
);

//--------------- CART CRUD ---------------//
/*
    DESC: Add equipment to cart
    METHOD: POST
    API_ENDPOINT: /api/user/cart
*/
router.get("/cart/add");

export default router;
