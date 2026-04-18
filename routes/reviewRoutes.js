const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createReview,
  getAgentReviews,
} = require("../controllers/reviewController");

// Create review
router.post("/", auth, createReview);

// Get reviews for agent
router.get("/:agentId", getAgentReviews);

module.exports = router;
