import mongoose from "mongoose";

const bloodSchema = mongoose.Schema(
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
    group: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    lastdonate: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blood = mongoose.model("Blood", bloodSchema);

export default Blood;