import express from "express";
const router = express.Router();
import {
  addRequestDonor,
  getMyRequests,
  getRequestById,
  getRequests,
  updateRequestToApproved,
  availableDonor,
} from "../controller/requestController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, addRequestDonor)
  .get(protect, admin, getRequests);
router.route("/available").post(protect, admin, availableDonor);
router.route("/mine").get(protect, getMyRequests);
router.route("/:id").get(protect, getRequestById);
router.route("/:id/approve").put(protect, admin, updateRequestToApproved);

export default router;