const express = require("express");
const {
  createUser, getUsers, deleteUser
} = require('../controllers/user');
const { verifyAdminRole, verifyOwner } = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyAdminRole, getUsers)
router.delete("/:id", verifyAdminRole, verifyOwner, deleteUser)

module.exports = router;
