const Pharmacy = require("../models/Pharmacy");

const getProfile = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);

    const pharmacy = await Pharmacy.findOne({
      email: req.user?.email,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
        searchedEmail: req.user?.email,
      });
    }

    return res.status(200).json({
      success: true,
      pharmacy,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findOne({
      email: req.user.email,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    pharmacy.phone =
      req.body.phone || pharmacy.phone;

    pharmacy.address =
      req.body.address || pharmacy.address;

    pharmacy.city =
      req.body.city || pharmacy.city;

    pharmacy.pincode =
      req.body.pincode || pharmacy.pincode;

    if (req.body.latitude) {
      pharmacy.location.latitude =
        req.body.latitude;
    }

    if (req.body.longitude) {
      pharmacy.location.longitude =
        req.body.longitude;
    }
        pharmacy.deliveryAvailable =
        req.body.deliveryAvailable ??
        pharmacy.deliveryAvailable;

        pharmacy.deliveryRadius =
        req.body.deliveryRadius ??
        pharmacy.deliveryRadius;
    await pharmacy.save();

    res.status(200).json({
      success: true,
      pharmacy,
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};