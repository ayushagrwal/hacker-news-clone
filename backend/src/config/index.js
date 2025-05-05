const dotenv = require('dotenv');
const path = require('path');
const { PrismaClient } = require("@prisma/client");

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Configuration object
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    prisma
};

module.exports = config;