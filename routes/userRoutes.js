const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addBookmark,
  getBookmarks,
  getUserProfile,
} = require("../controllers/userController");

// Protected
router.post("/bookmark", auth, addBookmark);
router.get("/bookmarks", auth, getBookmarks);
router.get("/me", auth, getUserProfile);

module.exports = router;
