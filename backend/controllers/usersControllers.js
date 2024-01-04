const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getUser = asyncHandler(async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).json({ message: "No User Found" });
  }
  const user = await User.findOne({ username })
    .select("-password")
    .lean()
    .exec();
  res.json(user);
});
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find().select("-password").lean().exec();
  if (!user) {
    return res.status(400).json({ message: "No Users Found" });
  }
  res.json(user);
});

//Creating a New User
const createNewUser = asyncHandler(async (req, res) => {
  const {
    username,
    password,
    skills,
    seeking,
    userId,
    email,
    Job,
    Company,
    Address,
    Gender,
  } = req.body;

  if (
    !username ||
    !password ||
    !Array.isArray(skills) ||
    !Array.isArray(seeking) ||
    !skills.length ||
    !seeking.length ||
    !userId ||
    !email
  ) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }
  //Checking for Duplicates
  const duplicate = await User.findOne({ username }).lean().exec();
  const duplicateId = await User.findOne({ userId }).lean().exec();
  const duplicateEmail = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username " });
  }
  if (duplicateId) {
    return res.status(409).json({ message: "Duplicate ID " });
  }
  if (duplicateEmail) {
    return res.status(409).json({ message: "Duplicate Email ID " });
  }

  //hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = {
    username: username,
    password: hashedPassword,
    Skills: skills,
    Seeking: seeking,
    userId: userId,
    email: email,
  };
  // Job, Company, Address, Gender;
  if (!Job) {
    userObject.Job = Job;
  }
  if (!Company) {
    userObject.Company = Company;
  }
  if (!Address) {
    userObject.Address = Address;
  }
  if (!Gender) {
    userObject.Gender = Gender;
  }

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New User ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid UserData Received" });
  }
});

//Update User

const updateUser = asyncHandler(async (req, res) => {
  const {
    userId,
    username,
    password,
    skills,
    seeking,
    email,
    Job,
    Company,
    Address,
    Gender,
  } = req.body;

  if (
    !username ||
    !Array.isArray(skills) ||
    !Array.isArray(seeking) ||
    !skills.length ||
    !seeking.length ||
    !email ||
    !userId
  ) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  const user = await User.findOne({ username }).exec();

  if (!user) {
    return res.status(400).json({ message: "User for given data Not Found" });
  }

  //checking duplicates
  const duplicate = await User.findOne({ username }).lean().exec();
  const duplicateId = await User.findOne({ userId }).lean().exec();
  const duplicateEmail = await User.findOne({ email }).lean().exec();
  //Allow updates to the original user
  if (duplicate && user.username !== username) {
    return res.status(400).json({ message: "Duplicate ID Found" });
  }
  if (duplicateId && user.userId !== userId) {
    return res.status(400).json({ message: "Duplicate ID Found" });
  }
  if (duplicateEmail && user.email !== email) {
    return res.status(400).json({ message: "Duplicate EmailID Found" });
  }
  user.username = username;
  user.Skills = skills;
  user.Seeking = seeking;
  user.email = email;
  user.userId = userId;
  if (Job) {
    user.Job = Job;
    console.log("Job");
  }
  if (Company) {
    user.Company = Company;
    console.log("Company");
  }
  if (Address) {
    user.Address = Address;
    console.log("Address");
  }
  if (Gender) {
    user.Gender = Gender;
    console.log("Gender");
  }
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} Updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }
  const user = await User.findOne({ username }).exec();
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  const result = await User.deleteOne({ username });
  const reply = `Username ${user.username} with ID ${user.userId} Deleted`;
  res.json(reply);
});

module.exports = {
  getUser,
  getUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
