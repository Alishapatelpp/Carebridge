const User = require("../models/User");
const Order = require("../models/Order");
const Pharmacy = require("../models/Pharmacy");
const Medicine = require("../models/Medicine");
const Revenue = require("../models/Revenue");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const totalPharmacies =
      await Pharmacy.countDocuments();

    const totalMedicines =
      await Medicine.countDocuments();

    const revenueData =
      await Revenue.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0]
            .totalRevenue
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalOrders,
        totalPharmacies,
        totalMedicines,
        totalRevenue,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find()
        .populate(
          "user",
          "name email"
        )
        .populate(
          "pharmacy",
          "pharmacyName email city"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllOrders,
};