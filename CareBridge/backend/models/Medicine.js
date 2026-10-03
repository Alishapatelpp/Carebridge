const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },

    manufacturer: {
      type: String,
      default: "",
    },

    prescriptionRequired: {
      type: Boolean,
      default: false,
    },

    dosageInfo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Medicine",
  medicineSchema
);