const Order = require("../models/Order");
const Prescription = require("../models/Prescription");
const Notification = require("../models/Notification");
const Pharmacy = require("../models/Pharmacy");

const getCustomerDashboardStats =
  async (req, res) => {
    try {
      const orders =
        await Order.countDocuments({
          user: req.user._id,
        });

      const prescriptions =
        await Prescription.countDocuments({
          patient: req.user._id,
        });

      const notifications =
        await Notification.countDocuments({
          user: req.user._id,
          isRead: false,
        });

      const pharmacies =
        await Pharmacy.countDocuments();

      res.status(200).json({
        success: true,
        stats: {
          orders,
          prescriptions,
          pharmacies,
          notifications,
        },
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
  getCustomerDashboardStats,
};