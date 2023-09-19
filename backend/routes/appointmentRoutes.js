import express from "express";
const router = express.Router();
import {
  addAppointmentItems,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentToPaid,
  updateAppointmentToApproved,
  getAppointments,
} from "../controller/appoinmentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, addAppointmentItems)
  .get(protect, admin, getAppointments);
router.route("/mine").get(protect, getMyAppointments);
router.route("/:id").get(protect, getAppointmentById);
router.route("/:id/pay").put(protect, updateAppointmentToPaid);
router.route("/:id/approve").put(protect, admin, updateAppointmentToApproved);

export default router;
