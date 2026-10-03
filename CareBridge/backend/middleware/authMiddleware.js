const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Pharmacy = require("../models/Pharmacy");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("DECODED:", decoded);

      let user = await User.findById(
        decoded.id || decoded._id
      ).select("-password");

      if (!user) {
        user = await Pharmacy.findById(
          decoded.id || decoded._id
        ).select("-password");
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;

      console.log("USER:", req.user);

      next();
    } catch (error) {
      console.error(error);

      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "No Token Provided",
    });
  }
};

module.exports = protect;