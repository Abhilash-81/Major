import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const getUser = asyncHandler(async (req, res) => {
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

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean().exec();
  if (!users) {
    return res.status(400).json({ message: "No Users Found" });
  }
  res.status(200).json(users);
});

// @desc  Get User Profile
//route   Get/users/profile
//@access Private

export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc Update User Profile
// PUT /users/profile
//@access Private

export const updateUserProfile = asyncHandler(async (req, res) => {
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

export const deleteUser = asyncHandler(async (req, res) => {
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
