const Booking = require("../models/Booking");
const Trek = require("../models/Trek");

// 🔥 Create Booking (SAFE VERSION)
exports.createBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const { trekId, agentId, date } = req.body; // ✅ TAKE agentId

    console.log("REQ BODY:", req.body); // debug

    const booking = new Booking({
      userId,
      trekId,
      agentId, // ✅ USE THIS
      date,
    });

    await booking.save();

    res.json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 Get bookings for logged-in user
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const bookings = await Booking.find({ userId })
      .populate("trekId")
      .populate("agentId");

    console.log("USER BOOKINGS:", bookings); // 🔥 debug

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 Get bookings for logged-in agent (SECURE)
exports.getAgentBookings = async (req, res) => {
  try {
    const agentId = req.userId;

    const bookings = await Booking.find({ agentId })
      .populate("trekId")
      .populate("userId");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 Update booking status (Accept / Reject)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
