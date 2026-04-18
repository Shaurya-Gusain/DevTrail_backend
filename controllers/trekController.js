const Trek = require("../models/Trek");

// 🔹 Get all treks
exports.getTreks = async (req, res) => {
  try {
    const treks = await Trek.find().populate("guideId", "name email");
    res.json(treks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get single trek
exports.getTrekById = async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id).populate(
      "guideId",
      "name email",
    );

    if (!trek) {
      return res.status(404).json({ message: "Trek not found" });
    }

    res.json(trek);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 Create trek (UPDATED)
exports.createTrek = async (req, res) => {
  try {
    const {
      name,
      city,
      state,
      location,
      baseCamp,
      duration,
      height,
      distance,
      difficulty,
      trailType,
      season,
      months,
      railHead,
      airport,
      permitRequired,
      bestFor,
      description,
      latitude,
      longitude,
      images,
      price,
    } = req.body;

    // ✅ minimal validation
    if (!name || !city || !price || !duration) {
      return res.status(400).json({
        message: "Name, city, price, and duration are required",
      });
    }

    const trek = new Trek({
      name,
      city,
      state,
      location,
      baseCamp,
      duration,
      height,
      distance,
      difficulty,
      trailType,
      season,
      months,
      railHead,
      airport,
      permitRequired,
      bestFor,
      description,
      latitude,
      longitude,
      images,
      price,
      guideId: req.userId,
    });

    await trek.save();

    res.status(201).json(trek);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 Update trek (only owner)
exports.updateTrek = async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id);

    if (!trek) {
      return res.status(404).json({ message: "Trek not found" });
    }

    if (trek.guideId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTrek = await Trek.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTrek);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 Delete trek (only owner)
exports.deleteTrek = async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id);

    if (!trek) {
      return res.status(404).json({ message: "Trek not found" });
    }

    if (trek.guideId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await trek.deleteOne();

    res.json({ message: "Trek deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
