const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
    trekId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trek",
    },
    date: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
);

// 🔥 IMPORTANT EXPORT
module.exports = mongoose.model("Booking", bookingSchema);
