const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  console.log(username);
  const user = await User.findOne({ username })
    .select("-password")
    .lean()
    .exec();
  if (!user) {
    return res.status(400).json({ message: "No Users Found" });
  }
  res.status(200).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean().exec();
  if (!users) {
    return res.status(400).json({ message: "No Users Found" });
  }
  res.status(200).json(users);
});

// @desc  Auth user/set token / login user
//route   POST/users/auth
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "All Fields Are Required " });
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res
      .status(201)
      .json({ message: `User LogedIn Successfully with email-id ${email}` });
  } else {
    res.status(400).json({ message: "Invalid email or passwordx" });
  }
});

// @desc  Register User
//route   POST/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const {
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
    !password ||
    !Array.isArray(skills) ||
    !Array.isArray(seeking) ||
    !skills.length ||
    !seeking.length ||
    !email
  ) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }
  //Checking for Duplicates
  const duplicate = await User.findOne({ username }).lean().exec();
  const duplicateEmail = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username " });
  }
  if (duplicateEmail) {
    return res.status(409).json({ message: "Duplicate Email ID " });
  }

  const userObject = {
    username: username,
    password: hashedPassword,
    Skills: skills,
    Seeking: seeking,
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
    generateToken(res, user._id);
    res
      .status(201)
      .json({ message: `New User Registered with username ${username}` });
  } else {
    res.status(400).json({ message: "Invalid UserData Received" });
  }
  res.status(200).json({ Message: "Register User" });
});

// @desc  logout User
//route   POST/users/logout
//@access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ Message: "User Logged out" });
});

// @desc  Get User Profile
//route   Get/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc Update User Profile
// PUT /users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const {
    _id,
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

  const user =
    (await User.findOne({ username }).exec()) ||
    (await User.findOne({ email }).exec());

  if (!user) {
    return res.status(400).json({ message: "User for given data Not Found" });
  }

  //checking duplicates
  const duplicate = await User.findOne({ username }).lean().exec();
  const duplicateEmail = await User.findOne({ email }).lean().exec();
  //Allow updates to the original user
  if (duplicate && user.username !== username)
    return res
      .status(400)
      .json({ message: "Duplicate username Found,please change username" });

  if (duplicateEmail && user.email !== email)
    return res.status(400).json({ message: "Duplicate EmailID Found" });

  user.username = username;
  user.Skills = skills;
  user.Seeking = seeking;
  user.email = email;
  if (Job) user.Job = Job;
  if (Company) user.Company = Company;
  if (Address) user.Address = Address;
  if (Gender) user.Gender = Gender;
  if (password) user.password = password;
  const updatedUser = await user.save();
  res.status(200).json({ message: `${updatedUser.username} Updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }
  const user = await User.findOne({ username }).exec();
  // console.log(user);
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  const result = await User.deleteOne({ username });
  const reply = `Username ${user.username} with ID ${user.userId} Deleted`;
  res.json(reply);
});

module.exports = {
  getUser,
  logoutUser,
  registerUser,
  getUsers,
  getUserProfile,
  authUser,
  updateUserProfile,
  deleteUser,
};
