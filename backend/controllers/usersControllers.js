const User = require("../models/user");
const { ObjectId } = require("mongodb");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getUsers = asyncHandler(async (req, res) => {
  const id = req.body;
  if (!id || !id.id) {
    const users = await User.find().lean();
    if (!users?.length) {
      return res.status(400).json({ message: "No Users Found" });
    }
    res.json(users);
  } else {
    const user = await User.findById(id.id).exec();
    if (!user) {
      return res.status(400).json({ message: "No User with given ID Found" });
    }

    res.json(user);
  }
});

//Creating a New User

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, skills, seeking } = req.body;

  if (
    !username ||
    !password ||
    !Array.isArray(skills) ||
    !Array.isArray(seeking) ||
    !skills.length ||
    !seeking.length
  ) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  //Checking for Duplicates
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate UserName" });
  }

  //hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = {
    username: username,
    password: hashedPassword,
    Skills: skills,
    Seeking: seeking,
  };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New User ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid UserData Received" });
  }
});

//Update User

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, skills, seeking } = req.body;

  if (
    !username ||
    !Array.isArray(skills) ||
    !Array.isArray(seeking) ||
    !skills.length ||
    !seeking.length
  ) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }

  //checking duplicates

  const duplicate = await User.findOne({ username }).lean().exec();
  //Allow updates to the original User
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(400).json({ message: "Duplicate Username" });
  }
  user.username = username;
  user.Skills = skills;
  user.Seeking = seeking;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} Updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }
  const user = await User.findById(id.id).exec();
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  const result = await User.deleteOne({ _id: new ObjectId(id.id) });
  const reply = `Username ${user.username} with ID ${user._id} Deleted`;
  res.json(reply);
});

module.exports = {
  getUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
