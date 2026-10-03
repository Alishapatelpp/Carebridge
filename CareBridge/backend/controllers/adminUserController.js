const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User/Admin
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Suspend / Activate User
const toggleUserStatus = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isActive =
      !user.isActive;

    await user.save();

    res.status(200).json({
      success: true,
      message: user.isActive
        ? "Admin Enabled"
        : "Admin Disabled",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Admin
const createAdmin = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      adminLevel,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const admin =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role: "admin",
        adminLevel:
          adminLevel || 2,
        isActive: true,
      });

    res.status(201).json({
      success: true,
      admin,
      message:
        "Admin created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateAdmin = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      adminLevel,
    } = req.body;

    const admin =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          adminLevel,
        },
        {
          new: true,
        }
      );

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin,
      message:
        "Admin updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllUsers,
  deleteUser,
  toggleUserStatus,
  createAdmin,
  updateAdmin,
};