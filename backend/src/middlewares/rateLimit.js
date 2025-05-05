/**
 * Rate limiting middleware
 * Protects API endpoints from abuse by limiting the number of requests
 */
const rateLimit = require('express-rate-limit');

// General API rate limiter - 100 requests per IP per 15 minutes
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   message: {
//     status: 429,
//     message: 'Too many requests, please try again later.'
//   }
// });

// Auth endpoints rate limiter - more strict for login/registration to prevent brute force
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 login/registration attempts per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Too many login/registration attempts, please try again after an hour.'
  }
});

// Post/comment creation limiter - prevent spam
const createContentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15, // limit each IP to 30 posts/comments per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429, 
    message: 'You have created too many posts/comments. Please try again later.'
  }
});

module.exports = {
//   apiLimiter,
  authLimiter,
  createContentLimiter
}; 