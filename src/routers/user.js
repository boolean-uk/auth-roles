const express = require("express");
const {
  createUser, getUsers
} = require('../controllers/user');
const { verifyAdminRole } = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyAdminRole, getUsers)

module.exports = router;
