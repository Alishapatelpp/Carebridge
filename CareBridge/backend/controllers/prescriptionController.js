const Prescription = require(
  "../models/Prescription"
);

const Pharmacy = require(
  "../models/Pharmacy"
);

const Notification = require(
  "../models/Notification"
);

/* Upload Prescription */
const uploadPrescription = async (
  req,
  res
) => {
  try {
    const {
      medicine,
      pharmacyId,
      fileUrl,
    } = req.body;

    const prescription =
      await Prescription.create({
        patient: req.user._id,
        pharmacy: pharmacyId,
        medicine,
        fileUrl,
        status: "Pending",
      });

    res.status(201).json({
      success: true,
      prescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* Get Pharmacy Prescriptions */
const getPharmacyPrescriptions =
  async (req, res) => {
    try {
      const pharmacy =
        await Pharmacy.findOne({
          email: req.user.email,
        });

      if (!pharmacy) {
        return res.status(404).json({
          success: false,
          message:
            "Pharmacy not found",
        });
      }

      const prescriptions =
        await Prescription.find({
          pharmacy:
            pharmacy._id,
        })
          .populate(
            "patient",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        prescriptions,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* Approve Prescription */
const approvePrescription =
  async (req, res) => {
    try {
      const pharmacy =
        await Pharmacy.findOne({
          email: req.user.email,
        });

      if (!pharmacy) {
        return res.status(404).json({
          success: false,
          message:
            "Pharmacy not found",
        });
      }

      const prescription =
        await Prescription.findById(
          req.params.id
        );

      if (!prescription) {
        return res.status(404).json({
          success: false,
          message:
            "Prescription not found",
        });
      }

      if (
        prescription.pharmacy.toString() !==
        pharmacy._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Unauthorized prescription access",
        });
      }

      if (
        prescription.status !==
        "Pending"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Prescription already processed",
        });
      }

      prescription.status =
        "Approved";

      prescription.approvedAt =
        new Date();

      prescription.approvedBy =
        pharmacy._id;

      await prescription.save();

      await Notification.create({
        user:
          prescription.patient,

        title:
          "Prescription Approved",

        message:
          `${prescription.medicine} prescription has been approved.`,
      });

      res.status(200).json({
        success: true,
        message:
          "Prescription approved",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/* Reject Prescription */
const rejectPrescription =
  async (req, res) => {
    try {
      const pharmacy =
        await Pharmacy.findOne({
          email: req.user.email,
        });

      if (!pharmacy) {
        return res.status(404).json({
          success: false,
          message:
            "Pharmacy not found",
        });
      }

      const prescription =
        await Prescription.findById(
          req.params.id
        );

      if (!prescription) {
        return res.status(404).json({
          success: false,
          message:
            "Prescription not found",
        });
      }

      if (
        prescription.pharmacy.toString() !==
        pharmacy._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Unauthorized prescription access",
        });
      }

      if (
        prescription.status !==
        "Pending"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Prescription already processed",
        });
      }

      prescription.status =
        "Rejected";

      prescription.approvedAt =
        new Date();

      prescription.approvedBy =
        pharmacy._id;

      prescription.remarks =
        req.body.remarks || "";

      await prescription.save();

      await Notification.create({
        user:
          prescription.patient,

        title:
          "Prescription Rejected",

        message:
          `${prescription.medicine} prescription has been rejected.`,
      });

      res.status(200).json({
        success: true,
        message:
          "Prescription rejected",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
  const getMyPrescriptions =
  async (req, res) => {
    try {
      const prescriptions =
        await Prescription.find({
          patient: req.user._id,
        })
          .populate(
            "pharmacy",
            "pharmacyName"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        prescriptions,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  uploadPrescription,
  getPharmacyPrescriptions,
  approvePrescription,
  rejectPrescription,
  getMyPrescriptions,
};