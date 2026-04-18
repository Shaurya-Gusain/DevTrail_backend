const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getTreks,
  getTrekById,
  createTrek,
  updateTrek,
  deleteTrek,
} = require("../controllers/trekController");

// 🔹 Public routes
router.get("/", getTreks);
router.get("/:id", getTrekById);

// 🔹 Protected routes (Agent only)
router.post("/", auth, createTrek);
router.put("/:id", auth, updateTrek);
router.delete("/:id", auth, deleteTrek);

module.exports = router;
