const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        adminLevel: user.adminLevel || 0,
        },
        });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("LOGIN USER:");
    console.log(user);
    console.log("ADMIN LEVEL:", user?.adminLevel);

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

        res.status(200).json({
        success: true,
        token,
        user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        adminLevel: user.adminLevel || 0,
        },
        });
 
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
