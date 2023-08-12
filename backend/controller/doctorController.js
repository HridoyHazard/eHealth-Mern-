import asyncHandler from "../middleware/asyncHandler.js";
import Doctor from "../models/doctorModel.js"

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({});
  res.json(doctors);
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (doctor) {
    return res.json(doctor);
  }
  res.status(404);
  throw new Error("Doctors Not Found");
});

export { getDoctors,getDoctorById };
