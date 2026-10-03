const mongoose =
require("mongoose");

const revenueSchema =
new mongoose.Schema(
  {
    pharmacy: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },

    order: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
mongoose.model(
  "Revenue",
  revenueSchema
);