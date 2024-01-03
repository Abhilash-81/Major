const User = require("../models/user");
const { ObjectId } = require("mongodb");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const getUser = asyncHandler(async (req, res) => {
  const id = req.body;
  const user = await User.findById(id).select("-password").lean().exec();
  console.log(user, id);
  if (!user) {
    return res.status(400).json({ message: "No Users Found" });
  }
  res.json(user);
});

module.exports = {
  getUser,
};
