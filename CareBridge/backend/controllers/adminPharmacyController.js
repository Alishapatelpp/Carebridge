const Pharmacy = require("../models/Pharmacy");

const getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();

    res.status(200).json({
      success: true,
      pharmacies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePharmacy = async (
  req,
  res
) => {
  try {
    const pharmacy =
      await Pharmacy.findByIdAndDelete(
        req.params.id
      );

    if (!pharmacy) {
      return res.status(404).json({
        message: "Pharmacy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pharmacy deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllPharmacies,
  deletePharmacy,
};