const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },

    medicineName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },
    orderType: {
      type: String,
      enum: ["Pickup", "Delivery"],
      default: "Pickup",
    },

    deliveryAddress: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      default: 0,
    },

    paymentMethod: {
      type: String,
      enum: [
        "COD",
        "UPI",
        "CARD",
      ],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
      ],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );