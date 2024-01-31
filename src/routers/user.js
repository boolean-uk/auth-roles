const express = require("express");
const { createUser, getUsers } = require("../controllers/user");
const { verifyToken, verifyAdminRole } = require("../middleware/auth.js");

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, verifyAdminRole, getUsers);

module.exports = router;
