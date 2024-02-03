const express = require("express");
const {
  createUser,
  getAllUsers,
  deleteUserById,
} = require("../controllers/user");
const {
  verifyAdminRole,
  verifyToken,
  verifyUserPermissons,
} = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);

router.get("/", verifyToken, verifyAdminRole, getAllUsers);

router.delete("/:id", verifyToken, verifyUserPermissons, deleteUserById);

module.exports = router;
