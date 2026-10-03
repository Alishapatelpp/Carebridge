const express = require("express");
const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getRevenueStats,
} = require(
  "../controllers/revenueController"
);

router.get(
  "/stats",
  protect,
  getRevenueStats
);

module.exports = router;