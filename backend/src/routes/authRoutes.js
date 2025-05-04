const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user/:id", authMiddleware, authController.getUserById);

module.exports = router;
