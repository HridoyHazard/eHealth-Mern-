import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    specialist: {
      type: String,
      required: true,
    },
    chamber: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    available: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;