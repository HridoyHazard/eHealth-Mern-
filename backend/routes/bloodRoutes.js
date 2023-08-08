import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Blood from "../models/bloodModel.js"

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bloods = await Blood.find({});
    res.json(bloods);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const blood = await Blood.findById(req.params.id);

    if (blood) {
      return res.json(blood);
    }
    res.status(404).json({ message: "Medicine Not Found" });
  })
);

export default router;
