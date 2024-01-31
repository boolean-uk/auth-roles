const express = require("express");
const {
  createUser,
  getUsers
} = require('../controllers/user');
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);

router.get("/", verifyToken, getUsers)

module.exports = router;
