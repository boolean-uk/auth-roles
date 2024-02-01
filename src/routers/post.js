const express = require("express");
const {
  createPost,
  deletePosts
} = require('../controllers/post');
const { verifyToken, verifyDeletePermissions } = require("../middleware/auth");

const router = express.Router();

router.post("/", createPost);

router.delete("/:postId", verifyToken, verifyDeletePermissions, deletePosts)

module.exports = router;
