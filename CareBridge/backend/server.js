const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const protect = require("./middleware/authMiddleware");
const authorize = require("./middleware/roleMiddleware");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const profileRoutes = require("./routes/profileRoutes");
const pharmacyAuthRoutes = require("./routes/pharmacyAuthRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const adminPharmacyRoutes = require("./routes/adminPharmacyRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const pharmacyInventoryRoutes = require("./routes/pharmacyInventoryRoutes");
const searchRoutes = require("./routes/searchRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const revenueRoutes = require("./routes/revenueRoutes");
const pharmacyProfileRoutes = require("./routes/pharmacyProfileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const customerDashboardRoutes = require("./routes/customerDashboardRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* Routes */

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/pharmacies", pharmacyRoutes);

app.use("/api/medicines", medicineRoutes);

app.use("/api/profile", profileRoutes);

app.use(
  "/api/pharmacy-auth",
  pharmacyAuthRoutes
);

app.use(
  "/api/admin",
  adminUserRoutes
);

app.use(
  "/api/admin",
  adminPharmacyRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);
app.use(
"/api/prescriptions",
prescriptionRoutes
);
app.use(
"/api/pharmacy-inventory",
pharmacyInventoryRoutes
);
app.use(
  "/api/search",
  searchRoutes
);
app.use(
"/api/dashboard",
dashboardRoutes
);
app.use(
  "/api/revenue",
  revenueRoutes
);
app.use(
"/api/pharmacy-profile",
pharmacyProfileRoutes
);
app.use(
"/api/notifications",
notificationRoutes
);
app.use(
"/api/customer-dashboard",
customerDashboardRoutes
);

/* Home Route */

app.get("/", (req, res) => {
  res.send(
    "🚀 CareBridge Backend Running"
  );
});

/* Profile Route */

app.get(
  "/api/profile",
  protect,
  (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

/* Admin Route */

app.get(
  "/api/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

/* Start Server */

const startServer = async () => {
  try {
    await connectDB();

    const PORT =
      process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `✅ Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();