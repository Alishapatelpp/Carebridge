const express = require("express");

const router = express.Router();

const {
  createMedicine,
  getMedicines,
  findMedicineByName,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} = require(
  "../controllers/medicineController"
);

// Create Medicine
router.post(
  "/",
  createMedicine
);

// Get All Medicines
router.get(
  "/",
  getMedicines
);

// Search Medicine By Name
router.get(
  "/search/:name",
  findMedicineByName
);

// Get Single Medicine
router.get(
  "/:id",
  getMedicineById
);

// Update Medicine
router.put(
  "/:id",
  updateMedicine
);

// Delete Medicine
router.delete(
  "/:id",
  deleteMedicine
);

module.exports = router;