
const PharmacyInventory = require("../models/PharmacyInventory");

const calculateDistance = (
  lat1,
  lon1,
  lat2,
  lon2
) => {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
};

exports.searchMedicine = async (
  req,
  res
) => {
  try {
    const {
      medicine,
      latitude,
      longitude,
      sortBy,
    } = req.query;

    if (!medicine) {
      return res.status(400).json({
        success: false,
        message:
          "Medicine name is required",
      });
    }

    const inventory =
      await PharmacyInventory.find({
        medicineName: {
          $regex: medicine,
          $options: "i",
        },
        stock: { $gt: 0 },
        isAvailable: true,
      }).populate("pharmacy");

    let results = inventory.map(
      (item) => {
        let distance = null;

        if (
          latitude &&
          longitude &&
          item.pharmacy?.location
        ) {
          distance =
            calculateDistance(
              Number(latitude),
              Number(longitude),
              item.pharmacy.location
                .latitude,
              item.pharmacy.location
                .longitude
            );
        }
            console.log(
            "Customer:",
            latitude,
            longitude
            );

            console.log(
            "Pharmacy Location:",
            item.pharmacy?.location
            );

            console.log(
            "Delivery Radius:",
            item.pharmacy?.deliveryRadius
            );
        return {
          pharmacyId:
            item.pharmacy?._id,

          pharmacyName:
            item.pharmacy
              ?.pharmacyName ||
            item.pharmacy?.name,

          pharmacyAddress:
            item.pharmacy?.address,

          city:
            item.pharmacy?.city,

          medicine:
            item.medicineName,

          manufacturer:
            item.manufacturer,

          prescriptionRequired:
            item.prescriptionRequired,

          stock:
            item.stock,

          price:
            item.price,

          expiryDate:
            item.expiryDate,

          distance:
                distance !== null
                    ? Number(distance.toFixed(2))
                    : null,

                deliveryAvailable:
                distance !== null &&
                item.pharmacy?.deliveryAvailable &&
                distance <=
                    item.pharmacy?.deliveryRadius,

                deliveryRadius:
                item.pharmacy?.deliveryRadius,
        };
      }
    );

    if (sortBy === "price") {
      results.sort(
        (a, b) =>
          a.price - b.price
      );
    } else {
      results.sort(
        (a, b) =>
          (a.distance || 9999) -
          (b.distance || 9999)
      );
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to search medicine",
      error: error.message,
    });
  }
};