const express = require("express");

const router =
  express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getCustomerDashboardStats,
} = require(
  "../controllers/customerDashboardController"
);

router.get(
  "/stats",
  protect,
  getCustomerDashboardStats
);

module.exports = router;