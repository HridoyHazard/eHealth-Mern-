import express from "express";

const router = express.Router();
import { getDoctors, getDoctorById } from "../controller/doctorController.js";

router.route("/").get(getDoctors);
router.route("/:id").get(getDoctorById);

export default router;
