const express = require("express");
const { createUser, getUsers, deletUser } = require("../controllers/user");
const { verifyToken, verifyAdminRole } = require("../middleware/auth.js");

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, verifyAdminRole, getUsers);
router.delete("/:id", verifyToken, verifyAdminRole, deletUser);

module.exports = router;
