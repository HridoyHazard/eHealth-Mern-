import express from "express";
const router = express.Router();

import {
  getBloodById,
  getBloods,
  createBlood,
  updateBlood,
  deleteBlood,
} from "../controller/bloodController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getBloods).post(protect, admin, createBlood);
router
  .route("/:id")
  .get(getBloodById)
  .put(protect, admin, updateBlood)
  .delete(protect, admin, deleteBlood);

export default router;
