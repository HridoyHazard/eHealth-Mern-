import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    appointmentItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        chamber: { type: Number, required: true },
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Doctor',
        },
      },
    ],
    address: {
      address: { type: String, required: true },
      contact: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    appointmentsFee: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
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

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;