const express = require("express");
const {
  createUser,
  getAllUser,
  loginUser,
  deleteUser
} = require('../controllers/user');

const {verifyToken} = require('../middleware/auth')

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/",  verifyToken, getAllUser)
router.delete("/:id", deleteUser)


module.exports = router;
