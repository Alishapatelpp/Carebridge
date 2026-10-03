const mongoose = require("mongoose");

const prescriptionSchema =
  new mongoose.Schema(
    {
      patient: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      pharmacy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Pharmacy",
        required: true,
      },

      medicine: {
        type: String,
        required: true,
      },

      fileUrl: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "Approved",
          "Rejected",
        ],
        default: "Pending",
      },

      remarks: {
        type: String,
        default: "",
      },

      approvedAt: {
        type: Date,
      },

      approvedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Pharmacy",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Prescription",
  prescriptionSchema
);