const express = require("express");
const router = express.Router();
const { commentController } = require("../controllers");
const authMiddleware = require("../middlewares/authMiddleware");
const { rateLimiters } = require("../middlewares");

// Public routes
router.get("/post/:postId", commentController.getPostComments);
router.get("/:commentId/replies", commentController.getCommentReplies);

// Protected routes requiring authentication
router.post("/", authMiddleware, rateLimiters.createContentLimiter, commentController.createComment);
router.put("/:id", authMiddleware, commentController.updateComment);
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router; 