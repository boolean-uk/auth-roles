const express = require("express");
const {
  createPost, deletePost
} = require('../controllers/post');
const { verifyAdminRole, verifyOwner, verifyPostOwner } = require("../middleware/auth");

const router = express.Router();

router.post("/", createPost);
router.delete("/:id", verifyAdminRole, verifyPostOwner, deletePost);

module.exports = router;
