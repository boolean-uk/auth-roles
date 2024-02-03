const express = require("express");
const { createUser, getAllUsers } = require("../controllers/user");
const { verifyAdminRole, verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);

router.get("/", verifyToken, verifyAdminRole, getAllUsers);

module.exports = router;
