import express from "express";
const router = express.Router();

import { authMiddleware } from "../../middleware/verifyToken.js";
import isAdmin from "../../middleware/isAdmin.js";
import {
  getAllRequests,
  getRequestById,
  getRequestsForUser,
  createRequest,
  submitRequest,
  updateRequest,
  deleteRequest,
  getPendingRequests,
  acceptRequest,
  rejectRequest,
  markAsReturned,
} from "../../controllers/v1/request.controller.js";

// get requests for active user
router.get("/user", authMiddleware, getRequestsForUser);

// create a new request - add to cart
router.post("/create", authMiddleware, createRequest);

// get request by id
router.get("/:requestId", authMiddleware, getRequestById);

// submit a new request
router.patch("/:requestId/submit", authMiddleware, submitRequest);

// update a request
router.patch("/:requestId/update", authMiddleware, updateRequest);

// delete a request - as user - remove from cart or cancel after submitting
router.delete("/:requestId/delete", authMiddleware, deleteRequest);

// ------------- ADMIN ROUTES ------------ //

// get all requests
router.get("/", authMiddleware, isAdmin, getAllRequests);

// get all requests with 'requested' status
router.get("/requested", authMiddleware, isAdmin, getPendingRequests);

// accept a request - mark isAvailable as false / create order
router.patch("/:requestId/accept", authMiddleware, isAdmin, acceptRequest);

// reject a request
router.patch("/:requestId/reject", authMiddleware, isAdmin, rejectRequest);

// mark as returned
router.patch("/:requestId/returned", authMiddleware, isAdmin, markAsReturned);

// TODO: delete a request - as admin - after accepted, rejected, returned or overdue

// scheduler - check if end/return date is passed and update status to overdue

export default router;
