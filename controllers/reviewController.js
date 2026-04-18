const Review = require("../models/Review");

// 🔥 Create Review
exports.createReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { agentId, rating, comment } = req.body;

    const review = new Review({
      userId,
      agentId,
      rating,
      comment,
    });

    await review.save();

    res.json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 Get reviews for agent
exports.getAgentReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ agentId: req.params.agentId }).populate(
      "userId",
      "name",
    );

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
