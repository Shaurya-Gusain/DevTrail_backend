const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trek",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
