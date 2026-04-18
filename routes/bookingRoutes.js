const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createBooking,
  getUserBookings,
  getAgentBookings,
  updateStatus,
} = require("../controllers/bookingController");

// 🔹 Create booking
router.post("/", auth, createBooking);

// 🔹 User bookings
router.get("/user", auth, getUserBookings);

// 🔥 Agent bookings (FIXED - no param)
router.get("/agent", auth, getAgentBookings);

// 🔹 Update booking status
router.put("/:id", auth, updateStatus);

module.exports = router;
