const express = require("express");

const { createUser, getUsers, deleteUser } = require("../controllers/user");
const { verifyToken, verifyAdminRole } = require("../middleware/roles.js");

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, verifyAdminRole, getUsers);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
