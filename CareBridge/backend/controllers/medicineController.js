const Medicine = require("../models/Medicine");

// Create Medicine
exports.createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);

    res.status(201).json({
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Medicines
exports.getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Medicine By Name
exports.findMedicineByName = async (
  req,
  res
) => {
  try {
    const medicine = await Medicine.findOne({
      name: req.params.name,
    });

    res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Medicine
exports.getMedicineById = async (
  req,
  res
) => {
  try {
    const medicine =
      await Medicine.findById(
        req.params.id
      );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Medicine
exports.updateMedicine = async (
  req,
  res
) => {
  try {
    const medicine =
      await Medicine.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Medicine
exports.deleteMedicine = async (
  req,
  res
) => {
  try {
    const medicine =
      await Medicine.findById(
        req.params.id
      );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    await medicine.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};