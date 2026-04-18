const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  whatsappNumber: String,
  cities: [String],
  isVerified: { type: Boolean, default: false },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rating: { type: Number, default: 0 }, // average rating
  numReviews: { type: Number, default: 0 }, // total reviews
});

module.exports = mongoose.model("Agent", agentSchema);
