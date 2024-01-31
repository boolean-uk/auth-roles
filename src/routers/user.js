const express = require("express");
const {
  createUser,
  getUsers
} = require('../controllers/user');
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);

router.get("/", verifyToken, verifyAdmin, getUsers)

module.exports = router;
