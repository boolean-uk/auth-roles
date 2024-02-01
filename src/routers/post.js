const express = require("express");
const { createPost, deletePost } = require("../controllers/post");
const { verifyToken, verifyAdminRole } = require("../middleware/auth");

const router = express.Router();

router.post("/", createPost);
router.delete("/:id", verifyToken, verifyAdminRole, deletePost);

module.exports = router;
