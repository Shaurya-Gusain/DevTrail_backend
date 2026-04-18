const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getAgents,
  getAgentProfile,
  createAgent,
} = require("../controllers/agentController");

// Public
router.get("/", getAgents);

// Protected
router.post("/", auth, createAgent);
router.get("/me", auth, getAgentProfile);

module.exports = router;
