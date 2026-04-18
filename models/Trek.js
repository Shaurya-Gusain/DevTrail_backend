const mongoose = require("mongoose");

const trekSchema = new mongoose.Schema({
  name: { type: String, required: true },

  city: String,
  state: String,
  location: String, // "Chamoli, Uttarakhand"

  baseCamp: String,

  duration: Number, // Days
  height: Number, // ft
  distance: Number, // km

  difficulty: String,
  trailType: String,

  season: [String],
  months: [String],

  railHead: String,
  airport: String,

  permitRequired: Boolean,

  bestFor: String,
  description: String,

  latitude: Number,
  longitude: Number,

  images: [String],

  price: {
    type: Number,
    required: true,
  },

  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
});

module.exports = mongoose.model("Trek", trekSchema);
