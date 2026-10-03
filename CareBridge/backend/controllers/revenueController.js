const Revenue = require("../models/Revenue");
const Pharmacy = require("../models/Pharmacy");

const getRevenueStats = async (
  req,
  res
) => {
  try {
    const pharmacy =
      await Pharmacy.findOne({
        email: req.user.email,
      });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    const revenues =
      await Revenue.find({
        pharmacy: pharmacy._id,
      });

    const totalRevenue =
      revenues.reduce(
        (sum, revenue) =>
          sum + revenue.amount,
        0
      );

    const totalOrders =
      revenues.length;

    const averageOrderValue =
      totalOrders > 0
        ? Math.round(
            totalRevenue / totalOrders
          )
        : 0;

    res.status(200).json({
      success: true,
      totalRevenue,
      totalOrders,
      averageOrderValue,
      recentOrders: revenues
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0, 10),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRevenueStats,
};