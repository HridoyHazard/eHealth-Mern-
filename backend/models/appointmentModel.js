import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    time: { type: Date },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    appointmentItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        chamber: { type: String, required: true },
        degree: { type: String, required: true },
        specialist: { type: String, required: true },
        available: { type: String, required: true },
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Doctor",
        },
      },
    ],
    address: {
      address: { type: String, required: true },
      contact: { type: String, required: true },
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    ApprovedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
