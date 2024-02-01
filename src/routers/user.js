const express = require("express");
const { createUser, getUsers, deleteUser } = require('../controllers/user');
const { verifyToken, verifyAdmin, verifyDeletePermissions } = require("../middleware/auth");
const router = express.Router();

router.post("/", createUser);

router.get("/", verifyToken, verifyAdmin, getUsers)

router.delete("/:userId", verifyToken, verifyDeletePermissions, deleteUser)

module.exports = router;
