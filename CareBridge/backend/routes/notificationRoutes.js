const express = require("express");

const router =
  express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getMyNotifications,
  markAsRead,
} = require(
  "../controllers/notificationController"
);

router.get(
  "/my-notifications",
  protect,
  getMyNotifications
  
);

router.put(
"/read/:id",
protect,
markAsRead
);

module.exports = router;