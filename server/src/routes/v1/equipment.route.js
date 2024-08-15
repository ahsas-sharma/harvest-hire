import express from "express";

import {
  createEquipment,
  updateEquipment,
  displayAllEquipments,
  deleteEquipment,
  getEquipments,
} from "../../controllers/v1/equipment.controller.js";
import { authMiddleware } from "../../middleware/verifyToken.js";
import isAdmin from "../../middleware/isAdmin.js";

const router = express.Router();

router.get("/allitems", displayAllEquipments);

router.get("/", displayAllEquipments);

router.post("/create", authMiddleware, isAdmin, createEquipment);

router.patch("/:itemId/update", authMiddleware, isAdmin, updateEquipment);

router.delete("/:itemId/delete", authMiddleware, isAdmin, deleteEquipment);

// Get equipments using query filters - category, minPrice, maxPrice, available
router.get("/", getEquipments);

export default router;
