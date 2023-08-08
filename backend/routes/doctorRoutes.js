import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Doctor from "../models/doctorModel.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({});
    res.json(doctors);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      return res.json(doctor);
    }
    res.status(404).json({ message: "Medicine Not Found" });
  })
);

export default router;
