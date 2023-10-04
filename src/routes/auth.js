const express = require("express");
const router = express.Router();
const authController = require("../../src/controllers/authController");

router.post("/", authController.handleLogin);

module.exports = router;
