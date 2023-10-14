import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    requestItems: [
      {
        name: { type: String },
        age: { type: String },
        date: { type: Date },
        group: { type: String },
        contact: { type: Number },
        unit: { type: Number },
        hospital: { type: String },
      },
    ],
    availableDonor: [
      {
        number: { type: String },
      }
    ],
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

const RequestBlood = mongoose.model("RequestBlood", requestSchema);

export default RequestBlood;
