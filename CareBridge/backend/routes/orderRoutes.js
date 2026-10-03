const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  updatePaymentStatus,
} = require(
  "../controllers/orderController"
);

router.post(
  "/",
  protect,
  createOrder
);

router.get(
  "/",
  protect,
  getOrders
);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

router.put(
  "/status/:id",
  protect,
  updateOrderStatus
);

router.put(
  "/payment/:id",
  protect,
  updatePaymentStatus
);

module.exports = router;