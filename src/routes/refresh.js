const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../src/controllers/refreshTokenController");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
