const Pharmacy = require("../models/Pharmacy");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register Pharmacy
const registerPharmacy = async (req, res) => {
  try {
    const {
      pharmacyName,
      ownerName,
      email,
      phone,
      address,
      city,
      pincode,
      licenseNumber,
      password,
      latitude,
      longitude,
      deliveryAvailable,
deliveryRadius,
    } = req.body;

    const pharmacyExists = await Pharmacy.findOne({
      email,
    });

    if (pharmacyExists) {
      return res.status(400).json({
        message: "Pharmacy already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const pharmacy = await Pharmacy.create({
      pharmacyName,
      ownerName,
      email,
      phone,
      address,
      city,
      pincode,
      licenseNumber,
      password: hashedPassword,
      location: {
      latitude:
      Number(latitude) || 0,
      longitude:
      Number(longitude) || 0,
      },
      deliveryAvailable:
      deliveryAvailable ?? true,
       
      deliveryRadius:
      deliveryRadius ?? 5,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message:
        "Application submitted successfully",
      pharmacy,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Pending Pharmacies
const getPendingPharmacies = async (
  req,
  res
) => {
  try {
    const pharmacies = await Pharmacy.find({
      status: "Pending",
    });

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

// Approve Pharmacy
const approvePharmacy = async (
  req,
  res
) => {
  try {
    const pharmacy =
      await Pharmacy.findById(
        req.params.id
      );

    if (!pharmacy) {
      return res.status(404).json({
        message: "Pharmacy not found",
      });
    }

    pharmacy.status = "Approved";
    pharmacy.rejectionReason = "";

    await pharmacy.save();

    const existingUser =
      await User.findOne({
        email: pharmacy.email,
      });

    if (!existingUser) {
      await User.create({
        name: pharmacy.pharmacyName,
        email: pharmacy.email,
        password: pharmacy.password,
        role: "pharmacy",

        phone: pharmacy.phone,
        address: pharmacy.address,
        city: pharmacy.city,
        pincode: pharmacy.pincode,

        location: {
          latitude:
            pharmacy.location?.latitude || 0,
          longitude:
            pharmacy.location?.longitude || 0,
        },
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Pharmacy Approved Successfully",
      pharmacy,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Reject Pharmacy
const rejectPharmacy = async (
  req,
  res
) => {
  try {
    const pharmacy =
      await Pharmacy.findByIdAndUpdate(
        req.params.id,
        {
          status: "Rejected",
          rejectionReason:
            req.body.reason ||
            "No reason provided",
        },
        {
          new: true,
        }
      );

    if (!pharmacy) {
      return res.status(404).json({
        message: "Pharmacy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pharmacy Rejected",
      pharmacy,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerPharmacy,
  getPendingPharmacies,
  approvePharmacy,
  rejectPharmacy,
};