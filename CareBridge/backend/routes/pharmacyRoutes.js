const express = require("express");

const {
  getPharmacies,
  createPharmacy,
} = require("../controllers/pharmacyController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getPharmacies);

router.post("/", protect, createPharmacy);

module.exports = router;