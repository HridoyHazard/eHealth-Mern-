import asyncHandler from "../middleware/asyncHandler.js";
import Appointment from "../models/appointmentModel.js";

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const addAppointmentItems = asyncHandler(async (req, res) => {
  const { appointmentItems, address, paymentMethod, appointmentsFee } =
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
      paymentMethod,
      appointmentsFee,
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
  res.send("get my appointments");
});

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = asyncHandler(async (req, res) => {
  res.send("get appointment by id");
});

// @desc    Update appointment to paid
// @route   PUT /api/appointments/:id/pay
// @access  Private
const updateAppointmentToPaid = asyncHandler(async (req, res) => {
  res.send("update appointment to paid");
});

// @desc    Update appointment to delivered
// @route   GET /api/appointments/:id/deliver
// @access  Private/Admin
const updateAppointmentToApproved = asyncHandler(async (req, res) => {
  res.send("update appointment to approved");
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
  res.send("get all appointments");
});

export {
  addAppointmentItems,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentToPaid,
  updateAppointmentToApproved,
  getAppointments,
};
