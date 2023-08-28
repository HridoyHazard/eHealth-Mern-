import asyncHandler from "../middleware/asyncHandler.js";
import Medicine from "../models/medModel.js";

// @desc    Fetch all medicines
// @route   GET /api/meds
// @access  Public
const getMedicines = asyncHandler(async (req, res) => {
  const meds = await Medicine.find({});
  res.json(meds);
});

// @desc    Fetch single medicine
// @route   GET /api/meds/:id
// @access  Public
const getMedicineById = asyncHandler(async (req, res) => {
  const med = await Medicine.findById(req.params.id);

  if (med) {
    return res.json(med);
  }
  res.status(404);
  throw new Error("Medicines Not Found");
});

// @desc    Create a medicine
// @route   POST /api/meds
// @access  Private/Admin
const createMedicine = asyncHandler(async (req, res) => {
  const med = new Medicine({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdMedicine = await med.save();
  res.status(201).json(createdMedicine);
});

export { getMedicines,getMedicineById, createMedicine };
