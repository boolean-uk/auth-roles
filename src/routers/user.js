const express = require("express");
const {
  createUser, getAllUsers
} = require('../controllers/user');
const { authenticate, adminAuthorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", createUser);
router.get("/", authenticate, adminAuthorize, getAllUsers);

module.exports = router;
