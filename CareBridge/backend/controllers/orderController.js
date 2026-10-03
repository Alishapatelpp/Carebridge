const Order = require("../models/Order");
const Pharmacy = require("../models/Pharmacy");
const PharmacyInventory = require("../models/PharmacyInventory");
const Revenue = require("../models/Revenue");
const Notification = require("../models/Notification");

/* Create Order */

const createOrder = async (
  req,
  res
) => {
  try {
    const {
      pharmacy,
      medicineName,
      quantity,
      amount,
      paymentMethod,
      orderType,
    } = req.body;

    const order =
      await Order.create({
        user: req.user._id,
        pharmacy,
        medicineName,
        quantity,
        amount,
        paymentMethod,
        orderType,
      });

    res.status(201).json({
      success: true,
      message:
        "Order created successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

/* Pharmacy Orders */

const getOrders = async (
  req,
  res
) => {
  try {
    const pharmacy =
      await Pharmacy.findOne({
        email: req.user.email,
      });

    const orders =
      await Order.find({
        pharmacy:
          pharmacy._id,
      })
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

/* Customer Orders */

const getMyOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({
        user: req.user._id,
      })
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

/* Admin Orders */

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

/* Update Order Status */

const updateOrderStatus =
  async (req, res) => {
    try {
      const {
        orderStatus,
      } = req.body;

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      const previousStatus =
        order.orderStatus;

      order.orderStatus =
        orderStatus;

      /* APPROVED */

      if (
        orderStatus ===
          "Approved" &&
        previousStatus !==
          "Approved"
      ) {
        const inventory =
          await PharmacyInventory.findOne(
            {
              pharmacy:
                order.pharmacy,

              medicineName:
                order.medicineName,
            }
          );

        if (!inventory) {
          return res.status(404).json({
            success: false,
            message:
              "Medicine not found in inventory",
          });
        }

        if (
          inventory.stock <
          order.quantity
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Insufficient stock",
          });
        }

        inventory.stock -=
          order.quantity;

        await inventory.save();

        await Notification.create({
          user:
            order.user,

          title:
            "Order Approved",

          message:
            `${order.medicineName} order approved by pharmacy.`,
        });
      }

      /* PACKED */

      if (
        orderStatus ===
          "Packed" &&
        previousStatus !==
          "Packed"
      ) {
        await Notification.create({
          user:
            order.user,

          title:
            "Order Packed",

          message:
            `${order.medicineName} order packed and ready.`,
        });
      }

      /* DELIVERED */

      if (
        orderStatus ===
          "Delivered" &&
        previousStatus !==
          "Delivered"
      ) {
        // Auto payment completion

        order.paymentStatus =
          "Paid";

        await Revenue.create({
          pharmacy:
            order.pharmacy,

          order:
            order._id,

          amount:
            order.amount,
        });

        await Notification.create({
          user:
            order.user,

          title:
            "Order Delivered",

          message:
            `${order.medicineName} delivered successfully.`,
        });
      }

      await order.save();

      res.status(200).json({
        success: true,
        message:
          "Order status updated",
        order,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* Keep for Future Online Payments */

const updatePaymentStatus =
  async (req, res) => {
    try {
      const {
        paymentStatus,
      } = req.body;

      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            paymentStatus,
          },
          {
            new: true,
          }
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Payment status updated",
        order,
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
  createOrder,
  getOrders,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
};