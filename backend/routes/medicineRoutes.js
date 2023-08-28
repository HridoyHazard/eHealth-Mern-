import express from "express";
const router = express.Router();
import {
  getMedicineById,
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from "../controller/medicineController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getMedicines).post(protect, admin, createMedicine);
router
  .route("/:id")
  .get(getMedicineById)
  .put(protect, admin, updateMedicine)
  .delete(protect, admin, deleteMedicine);

export default router;
