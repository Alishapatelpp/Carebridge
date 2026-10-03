const express = require("express");

const {
  uploadPrescription,
  getPharmacyPrescriptions,
  approvePrescription,
  rejectPrescription,
  getMyPrescriptions,
} = require(
  "../controllers/prescriptionController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post(
  "/",
  protect,
  uploadPrescription
);

router.get(
  "/",
  protect,
  getPharmacyPrescriptions
);

router.put(
  "/approve/:id",
  protect,
  approvePrescription
);

router.put(
  "/reject/:id",
  protect,
  rejectPrescription
);
router.get(
"/my-prescriptions",
protect,
getMyPrescriptions
);

module.exports = router;