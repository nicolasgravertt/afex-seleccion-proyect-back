const express = require("express");
const router = express.Router();
const logoutController = require("../../src/controllers/auth/logoutController");

router.get("/", logoutController.handleLogout);

module.exports = router;
