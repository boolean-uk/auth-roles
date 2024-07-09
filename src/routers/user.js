const express = require("express");
const {
  createUser,
  getUsers,
  deleteUser
} = require('../controllers/user');
const { verifyAdmin } = require('../middleware/users')
const { verifyToken } = require('../middleware/universal')

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, verifyAdmin, getUsers)
router.delete("/:id", verifyToken, verifyAdmin, deleteUser)

module.exports = router;
