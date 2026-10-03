const express = require("express");

const {
  getDashboardStats,
  getAllOrders,
} = require("../controllers/adminController");

const protect = require(
  "../middleware/authMiddleware"
);

const authorize = require(
  "../middleware/roleMiddleware"
);

const router =
  express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

router.get(
  "/orders",
  protect,
  authorize("admin"),
  getAllOrders
);

module.exports = router;