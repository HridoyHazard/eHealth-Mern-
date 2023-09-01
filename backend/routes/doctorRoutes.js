import express from "express";

const router = express.Router();
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  deleteDoctor,
  updateDoctor,
} from "../controller/doctorController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getDoctors).post(protect, admin, createDoctor);
router
  .route("/:id")
  .get(getDoctorById)
  .put(protect, admin, updateDoctor)
  .delete(protect, admin, deleteDoctor);

export default router;
