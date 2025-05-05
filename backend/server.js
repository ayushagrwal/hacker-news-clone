/**
 * Main Express server configuration file
 * Sets up the backend server with all necessary middleware and routes
 */
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { authRoutes, postRoutes, commentRoutes } = require('./src/routes');
const { errorHandler } = require('./src/middlewares/errorHandler');
const { rateLimiters } = require('./src/middlewares');

// Load environment variables from .env file
dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600 // Cache preflight requests for 10 minutes
};

// Apply middleware
app.use(cors(corsOptions));  // Enable CORS with the specified options
app.use(express.json());     // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded request bodies

// Apply global rate limiter to all routes
// app.use(rateLimiters.apiLimiter);

// Register API routes
app.use("/api/auth", authRoutes);      // Authentication routes (login, register, etc.)
app.use("/api/posts", postRoutes);     // Post-related routes (create, read, update, delete)
app.use("/api/comments", commentRoutes); // Comment-related routes

// Global error handling middleware - catches and formats all errors
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Successfully started the server on port : ${process.env.PORT}`);
});