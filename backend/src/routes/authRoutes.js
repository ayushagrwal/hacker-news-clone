/**
 * Authentication Routes
 * Handles user registration, login, and profile retrieval
 */
const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const authMiddleware = require("../middlewares/authMiddleware");
const { rateLimiters } = require("../middlewares");

// User registration - creates a new user account
router.post("/register", rateLimiters.authLimiter, authController.register);

// User login - authenticates user and returns a JWT token
router.post("/login", rateLimiters.authLimiter, authController.login);

// Get user profile by ID - protected route requiring authentication
router.get("/user/:id", authMiddleware, authController.getUserById);

module.exports = router;
