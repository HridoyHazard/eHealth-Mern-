import asyncHandler from "../middleware/asyncHandler.js";
import Appointment from "../models/appointmentModel.js";

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const addAppointmentItems = asyncHandler(async (req, res) => {
  const { appointmentItems, address,  } =
    req.body;

  if (appointmentItems && appointmentItems.length === 0) {
    res.status(400);
    throw new Error("No appointment items");
  } else {
    const appointment = new Appointment({
      appointmentItems: appointmentItems.map((x) => ({
        ...x,
        doctor: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      address,
    });

    const createdAppointment = await appointment.save();

    res.status(201).json(createdAppointment);
  }
  res.send("add appointment");
});

// @desc    Get logged in user appointments
// @route   GET /api/appointments/mine
// @access  Private
const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id });
  res.status(200).json(appointments);
});

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (appointment) {
    res.status(200).json(appointment);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// @desc    Update appointment to approved
// @route   GET /api/appointments/:id/approve 
// @access  Private/Admin
const updateAppointmentToApproved = asyncHandler(async (req, res) => {
  res.send("update appointment to approved");
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({}).populate('user', 'id name');
  res.json(appointments);
});

export {
  addAppointmentItems,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentToApproved,
  getAppointments,
};
