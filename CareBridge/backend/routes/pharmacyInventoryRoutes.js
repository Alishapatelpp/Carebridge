const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} = require(
  "../controllers/pharmacyInventoryController"
);

router.get(
  "/",
  protect,
  getInventory
);

router.post(
  "/",
  protect,
  addInventory
);

router.put(
  "/:id",
  protect,
  updateInventory
);

router.delete(
  "/:id",
  protect,
  deleteInventory
);

module.exports = router;