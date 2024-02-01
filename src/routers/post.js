const express = require("express");
const { createPost, deletePost } = require("../controllers/post");
const { checkUserPermission, authenticate } = require("../middleware/auth");

const router = express.Router();

router.post("/", createPost);
router.delete(
  "/:id",
  authenticate,
  checkUserPermission("DELETE", "POST"),
  deletePost
);

module.exports = router;
