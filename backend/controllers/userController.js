const User = require("../models/user");
const { ObjectId } = require("mongodb");
const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const user = await User.findById(id).select("-password").lean().exec();
  if (!user) {
    return res.status(400).json({ message: "No Users Found" });
  }
  res.json(user);
});

module.exports = {
  getUser,
};
