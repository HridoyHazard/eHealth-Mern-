import express from "express";
const router = express.Router();
import {
  getMedicineById,
  getMedicines,
  createMedicine,
} from "../controller/medicineController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getMedicines).post(protect, admin, createMedicine);
router.route("/:id").get(getMedicineById);

export default router;
