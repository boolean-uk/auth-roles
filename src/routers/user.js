const express = require("express");
const {
  createUser, getAllUsers, login, deleteUser
} = require('../controllers/user');

const router = express.Router();

router.post("/", createUser);
router.get('/', getAllUsers)
router.post('/login', login)
router.delete('/:id', deleteUser)
module.exports = router;
