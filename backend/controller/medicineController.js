import asyncHandler from "../middleware/asyncHandler.js";
import Medicine from "../models/medModel.js";

const getMedicines = asyncHandler(async (req, res) => {
  const meds = await Medicine.find({});
  res.json(meds);
});

const getMedicineById = asyncHandler(async (req, res) => {
  const med = await Medicine.findById(req.params.id);

  if (med) {
    return res.json(med);
  }
  res.status(404);
  throw new Error("Medicines Not Found");
});

export { getMedicines,getMedicineById };
