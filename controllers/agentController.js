const Agent = require("../models/Agent");
const Review = require("../models/Review");

// 🔹 Get Agents (with city filter + ratings)
exports.getAgents = async (req, res) => {
  try {
    const { city } = req.query;

    // 🔥 FIX: use "cities" array with $in
    const agents = await Agent.find(
      city
        ? {
            cities: {
              $elemMatch: {
                $regex: `^${city}$`,
                $options: "i", // case-insensitive
              },
            },
          }
        : {},
    );

    const agentsWithRatings = await Promise.all(
      agents.map(async (agent) => {
        const reviews = await Review.find({ agentId: agent._id });

        const avgRating =
          reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : 0;

        return {
          ...agent._doc,
          rating: Number(avgRating.toFixed(1)),
          reviewCount: reviews.length,
        };
      }),
    );

    res.json(agentsWithRatings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get Agent Profile
exports.getAgentProfile = async (req, res) => {
  try {
    const agentId = req.userId;

    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    const reviews = await Review.find({ agentId });

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    res.json({
      ...agent._doc,
      rating: Number(avgRating.toFixed(1)),
      reviewCount: reviews.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Create Agent (optional)
exports.createAgent = async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
