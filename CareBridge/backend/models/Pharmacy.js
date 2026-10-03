const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    pharmacyName: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },
      location: {
      latitude: {
      type: Number,
      default: 0,
      },
      longitude: {
      type: Number,
      default: 0,
      },
      },
      deliveryAvailable: {
        type: Boolean,
        default: true,
      },

      deliveryRadius: {
        type: Number,
        default: 5,
      },
    licenseNumber: {
      type: String,
      required: true,
    },

    licenseImage: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    rejectionReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Pharmacy ||
  mongoose.model("Pharmacy", pharmacySchema);