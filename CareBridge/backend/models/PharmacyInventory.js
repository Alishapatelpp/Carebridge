const mongoose = require("mongoose");

const pharmacyInventorySchema =
  new mongoose.Schema(
    {
      pharmacy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pharmacy",
        required: true,
      },

      medicineName: {
        type: String,
        required: true,
      },

      manufacturer: {
        type: String,
        required: true,
      },

      stock: {
        type: Number,
        default: 0,
      },

      price: {
        type: Number,
        required: true,
      },

      expiryDate: {
        type: Date,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      dosageInformation: {
        type: String,
        default: "",
      },

      storageInstruction: {
        type: String,
        default: "",
      },

      prescriptionRequired: {
        type: Boolean,
        default: false,
      },

      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "PharmacyInventory",
  pharmacyInventorySchema
);