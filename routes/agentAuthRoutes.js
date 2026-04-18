const express = require("express");
const router = express.Router();

const {
  registerAgent,
  loginAgent,
} = require("../controllers/agentAuthController");

// 🔹 Register Agent
router.post("/register", registerAgent);

// 🔹 Login Agent
router.post("/login", loginAgent);

module.exports = router;
