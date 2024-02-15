import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
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

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found,With given Email" });
  }

  if (username) {
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate && user?.username !== username)
      return res
        .status(400)
        .json({ message: "Username Already Exists!,Try Another" });
  }

  const duplicateEmail = await User.findOne({ email }).lean().exec();

  if (duplicateEmail && user?.email !== email)
    return res
      .status(400)
      .json({ message: "EmailID Already Exists!,Try Another" });

  if (username) user.username = username;
  if (skills && skills?.length !== 0) user.Skills = skills;
  if (seeking && seeking?.length !== 0) user.Seeking = seeking;
  if (email) user.email = email;
  if (Job) user.Job = Job;
  if (Company) user.Company = Company;
  if (Address) user.Address = Address;
  if (Gender) user.Gender = Gender;
  if (password && password.length() > 0) {
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
  }
  const updatedUser = await user.save();
  res.status(200).json({ message: `${updatedUser.username} Updated ` });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  const result = await User.deleteOne({ username });
  const reply = `Username ${user.username} with ID ${user.userId} Deleted`;
  res.json(reply);
});
