import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Medicine from "../models/medModel.js"

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const meds = await Medicine.find({});
    res.json(meds);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const med = await Medicine.findById(req.params.id);

    if (med) {
      return res.json(med);
    }
    res.status(404).json({ message: "Medicine Not Found" });
  })
);

export default router;
