import asyncHandler from "../middleware/asyncHandler.js";
import Appointment from "../models/appointmentModel.js";

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const addAppointmentItems = asyncHandler(async (req, res) => {
  const { appointmentItems, address, time } = req.body;

  const desiredTime = new Date(time);

  desiredTime.setSeconds(0, 0);

  console.log(appointmentItems);

  let Drname = "";

  appointmentItems.map((x) => {
    Drname = x.name;
  });

  console.log(Drname);

  // console.log(desiredTime)
  // console.log(typeof(desiredTime));
  // console.log(address)
  // console.log(typeof(address));
  // console.log(appointmentItems)
  // console.log(typeof(appointmentItems));

  const isDoctorSame = await Appointment.find({
    "appointmentItems.name": Drname,
  });
console.log(isDoctorSame.length)
  if (isDoctorSame.length > 0) {
    const isSlotTaken = await Appointment.findOne({ time: desiredTime });
    if (isSlotTaken) {
      res.status(404);
      throw new Error("Time Slot Is Already Booked");
    } else {
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
          time: desiredTime,
          user: req.user._id,
          address,
        });

        const createdAppointment = await appointment.save();

        res.status(201).json(createdAppointment);
      }
    }
  } else {
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
        time: desiredTime,
        user: req.user._id,
        address,
      });

      const createdAppointment = await appointment.save();

      res.status(201).json(createdAppointment);
    }
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
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    appointment.isApproved = true;
    appointment.ApprovedAt = Date.now();

    const updatedAppointment = await appointment.save();

    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({}).populate("user", "id name");
  res.json(appointments);
});

export {
  addAppointmentItems,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentToApproved,
  getAppointments,
};
