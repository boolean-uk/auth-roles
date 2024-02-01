const express = require("express");
const { createPost, deletePosts } = require('../controllers/post');
const { verifyToken, verifyPostDeletePermissions } = require("../middleware/auth");
const router = express.Router();

router.post("/", createPost);

router.delete("/:postId", verifyToken, verifyPostDeletePermissions, deletePosts)

module.exports = router;
