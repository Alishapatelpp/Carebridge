const express = require("express");

const {
  registerPharmacy,
  getPendingPharmacies,
  approvePharmacy,
  rejectPharmacy,
} = require(
  "../controllers/pharmacyAuthController"
);

const router = express.Router();

router.post(
  "/register",
  registerPharmacy
);

router.get(
  "/pending",
  getPendingPharmacies
);

router.put(
  "/approve/:id",
  approvePharmacy
);

router.put(
  "/reject/:id",
  rejectPharmacy
);

module.exports = router;