const express = require("express");
const router = express.Router();
const authController = require("../../src/controllers/auth/authController");

router.post("/", authController.handleLogin);

module.exports = router;
