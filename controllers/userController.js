const User = require("../models/User");
const Booking = require("../models/Booking"); // 🔥 FIX

exports.addBookmark = async (req, res) => {
  try {
    const userId = req.userId;
    const { trekId } = req.body;

    const user = await User.findById(userId);

    const trekIdStr = trekId.toString();

    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === trekIdStr,
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== trekIdStr,
      );
    } else {
      user.bookmarks.push(trekId);
    }

    await user.save();

    res.json({
      message: alreadyBookmarked ? "Bookmark removed" : "Bookmarked",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🔹 Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    const bookings = await Booking.find({ userId });

    res.json({
      ...user._doc,
      bookingCount: bookings.length, // 🔥 FIX
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get Bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("bookmarks");

    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
