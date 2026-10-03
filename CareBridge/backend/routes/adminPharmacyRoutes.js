const express = require("express");

const {
  getAllPharmacies,
  deletePharmacy,
} = require(
  "../controllers/adminPharmacyController"
);

const router = express.Router();

router.get(
  "/pharmacies",
  getAllPharmacies
);

router.delete(
  "/pharmacies/:id",
  deletePharmacy
);

module.exports = router;