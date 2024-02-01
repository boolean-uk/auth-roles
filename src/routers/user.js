const express = require("express");
const { createUser, getAllUsers, deleteUser } = require("../controllers/user");
const {
  authenticate,
  adminAuthorize,
  checkUserPermission,
} = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);
router.get("/", authenticate, adminAuthorize, getAllUsers);
router.delete(
  "/:id",
  authenticate,
  checkUserPermission("DELETE", "USER"),
  deleteUser,
);

module.exports = router;
