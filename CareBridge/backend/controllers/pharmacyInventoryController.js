const PharmacyInventory = require(
  "../models/PharmacyInventory"
);
const Pharmacy = require("../models/Pharmacy");

exports.getInventory = async (
  req,
  res
) => {
  try {
    const pharmacy = await Pharmacy.findOne({
  email: req.user.email,
});

const inventory =
  await PharmacyInventory.find({
    pharmacy: pharmacy._id,
  })

        .populate(
          "pharmacy",
          "pharmacyName email city location deliveryAvailable deliveryRadius"
        );

    res.status(200).json({
      success: true,
      inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addInventory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const pharmacy = await Pharmacy.findOne({
      email: req.user.email,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    const inventory =
      await PharmacyInventory.create({
        medicineName: req.body.medicineName,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        dosageInformation:
          req.body.dosageInformation,
        prescriptionRequired:
          req.body.prescriptionRequired,
        stock: req.body.stock,
        price: req.body.price,
        expiryDate:
          req.body.expiryDate,
        storageInstruction:
          req.body.storageInstruction,

        pharmacy: pharmacy._id,
      });

    res.status(201).json({
      success: true,
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
  exports.updateInventory = async (
req,
res
) => {
try {
const inventory =
await PharmacyInventory.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
runValidators: true,
}
);
 
if (!inventory) {
return res.status(404).json({
success: false,
message:
"Inventory item not found",
});
}
 
res.status(200).json({
success: true,
inventory,
});
 
} catch (error) {
 
res.status(500).json({
success: false,
message: error.message,
});
 
}
};
 
exports.deleteInventory = async (
req,
res
) => {
try {
 
const inventory =
await PharmacyInventory.findById(
req.params.id
);
 
if (!inventory) {
return res.status(404).json({
success: false,
message:
"Inventory item not found",
});
}
 
await inventory.deleteOne();
 
res.status(200).json({
success: true,
message:
"Inventory deleted successfully",
});
 
} catch (error) {
 
res.status(500).json({
success: false,
message: error.message,
});
 
}
};