const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Skills: [
    {
      type: String,
    },
  ],
  Seeking: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
