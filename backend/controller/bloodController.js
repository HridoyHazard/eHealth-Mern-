import asyncHandler from "../middleware/asyncHandler.js";
import Blood from "../models/bloodModel.js"

const getBloods = asyncHandler(async (req, res) => {
  const bloods = await Blood.find({});
  res.json(bloods);
});

const getBloodById = asyncHandler(async (req, res) => {
  const blood = await Blood.findById(req.params.id);

  if (blood) {
    return res.json(blood);
  }
  res.status(404);
  throw new Error("Bloods Not Found");
});

export { getBloods,getBloodById };
