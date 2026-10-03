const express = require("express");

const {
  getAllUsers,
  deleteUser,
  toggleUserStatus,
  createAdmin,
  updateAdmin,
} = require(
  "../controllers/adminUserController"
);

const router = express.Router();

router.get(
  "/users",
  getAllUsers
);

router.delete(
  "/users/:id",
  deleteUser
);

router.put(
  "/users/status/:id",
  toggleUserStatus
);

router.post(
  "/admins",
  createAdmin
);
router.put(
"/users/:id",
updateAdmin
);

module.exports = router;