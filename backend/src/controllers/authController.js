/**
 * Authentication Controller
 * Handles user registration, login, and profile retrieval
 * Implements JWT-based authentication system
 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require('../config');

/**
 * Generate a JWT token for authenticated users
 * @param {Object} user - User object containing id and name
 * @returns {string} JWT token
 */
const generateToken = (user) => jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

/**
 * User registration handler
 * Creates a new user account with hashed password
 */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        // Return JWT token for immediate authentication
        res.json({ token: generateToken(user) });
    } catch (err) {
        next(err); // Pass to error handler middleware
    }
};

/**
 * User login handler
 * Authenticates user credentials and issues JWT token
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user and validate password
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
  
        // Return JWT token
        res.json({ token: generateToken(user) });
    } catch (err) {
        next(err); // Pass to error handler middleware
    }
};

/**
 * Get user profile by ID
 * Returns user details excluding sensitive information
 */
exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Find user with post and comment counts
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                _count: {
                    select: {
                        posts: true,
                        comments: true
                    }
                }
            }
        });

        // Return 404 if user not found
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        next(err); // Pass to error handler middleware
    }
};