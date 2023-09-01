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
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdMedicine = await med.save();
  res.status(201).json(createdMedicine);
});

// @desc    Update a medicine
// @route   PUT /api/meds/:id
// @access  Private/Admin
const updateMedicine = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const med = await Medicine.findById(req.params.id);

  if (med) {
    med.name = name;
    med.price = price;
    med.description = description;
    med.image = image;
    med.brand = brand;
    med.category = category;
    med.countInStock = countInStock;

    const updatedMedicine = await med.save();
    res.json(updatedMedicine);
  } else {
    res.status(404);
    throw new Error("Medicine not found");
  }
});

// @desc    Delete a medicine
// @route   DELETE /api/meds/:id
// @access  Private/Admin
const deleteMedicine = asyncHandler(async (req, res) => {
  const med = await Medicine.findById(req.params.id);

  if (med) {
    await Medicine.deleteOne({ _id: med._id });
    res.json({ message: "Medicine removed" });
  } else {
    res.status(404);
    throw new Error("Medicine not found");
  }
});

// @desc    Create new review
// @route   POST /api/meds/:id/reviews
// @access  Private
const createMedicineReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const med = await Medicine.findById(req.params.id);

  if (med) {
    const alreadyReviewed = med.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Medicine already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    med.reviews.push(review);

    med.numReviews = med.reviews.length;

    med.rating =
      med.reviews.reduce((acc, item) => item.rating + acc, 0) /
      med.reviews.length;

    await med.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Medicine not found");
  }
});

export {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  createMedicineReview,
};
