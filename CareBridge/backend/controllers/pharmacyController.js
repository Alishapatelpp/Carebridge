const Pharmacy = require("../models/Pharmacy");

const getPharmacies = async (req, res) => {
  try {
    const pharmacies =
      await Pharmacy.find({
        status: "Approved",
      });

    res.status(200).json({
      success: true,
      count: pharmacies.length,
      pharmacies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createPharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.create(req.body);

    res.status(201).json({
      success: true,
      pharmacy,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPharmacies,
  createPharmacy,
};