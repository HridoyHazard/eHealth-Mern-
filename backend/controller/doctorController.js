import asyncHandler from "../middleware/asyncHandler.js";
import Doctor from "../models/doctorModel.js";

// @desc    Fetch all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({});
  res.json(doctors);
});

// @desc    Fetch single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (doctor) {
    return res.json(doctor);
  }
  res.status(404);
  throw new Error("Medicines Not Found");
});

// @desc    Create a doctor
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = asyncHandler(async (req, res) => {
  const doctor = new Doctor({
    name: "Sample name",
    user: req.user._id,
    image: "/images/sample.jpg",
    degree: "Sample degree",
    specialist: "Sample specialist",
    chamber: "Sample chamber",
    tag: "Sample tag",
    available: "Sample available",
  });

  const createdDoctor = await doctor.save();
  res.status(201).json(createdDoctor);
});

// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
const updateDoctor = asyncHandler(async (req, res) => {
  const { name, image, degree, specialist, chamber, tag, available } = req.body;

  const doctor = await Doctor.findById(req.params.id);

  if (doctor) {
    doctor.name = name;
    doctor.image = image;
    doctor.degree = degree;
    doctor.specialist = specialist;
    doctor.chamber = chamber;
    doctor.tag = tag;
    doctor.available = available;

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (doctor) {
    await Doctor.deleteOne({ _id: doctor._id });
    res.json({ message: "Medicine removed" });
  } else {
    res.status(404);
    throw new Error("Medicine not found");
  }
});

export { getDoctors, getDoctorById, createDoctor, deleteDoctor, updateDoctor };
