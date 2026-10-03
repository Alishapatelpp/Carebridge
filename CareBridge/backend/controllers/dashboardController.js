const Order = require("../models/Order");
const Prescription = require("../models/Prescription");
const PharmacyInventory = require("../models/PharmacyInventory");
const Pharmacy = require("../models/Pharmacy");

const getDashboardStats = async (
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
        message:
          "Pharmacy not found",
      });
    }

    const pharmacyId =
      pharmacy._id;

    const totalOrders =
      await Order.countDocuments({
        pharmacy: pharmacyId,
      });

    const pendingOrders =
      await Order.countDocuments({
        pharmacy: pharmacyId,
        orderStatus: "Pending",
      });

    const totalInventory =
      await PharmacyInventory.countDocuments({
        pharmacy: pharmacyId,
      });

    const pendingPrescriptions =
      await Prescription.countDocuments({
        pharmacy: pharmacyId,
        status: "Pending",
      });

        const Revenue =
        require("../models/Revenue");

        const revenueData =
        await Revenue.find({
            pharmacy: pharmacyId,
        });

        const totalRevenue =
        revenueData.reduce(
            (sum, item) =>
            sum + item.amount,
            0
        );

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        totalInventory,
        pendingPrescriptions,
        totalRevenue,
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
  getDashboardStats,
};