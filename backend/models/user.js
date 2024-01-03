const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    Required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Job: {
    type: String,
  },
  Company: {
    type: String,
  },
  Address: {
    type: String,
  },
  Gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address",
    },
  },
  Skills: [
    {
      type: String,
      required: true,
    },
  ],
  Seeking: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
