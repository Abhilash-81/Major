import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import cloudinary from "../middlewares/cloudinary.js";

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

export const getUserWithId = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const user = await User.findOne({ id }).select("-password").lean().exec();
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
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
    Bio,
  } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          username: username || undefined,
          password: password
            ? bcrypt.hashSync(password, bcrypt.genSaltSync(9))
            : undefined,
          Skills: skills && skills.length !== 0 ? skills : undefined,
          Seeking: seeking && seeking.length !== 0 ? seeking : undefined,
          Job: Job || undefined,
          Company: Company || undefined,
          Address: Address || undefined,
          Gender: Gender || undefined,
          Bio: Bio || undefined,
        },
      },
      { new: true }
    );

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with given Email" });
    }

    // Check for duplicate username if it has changed
    if (username && user.username !== username) {
      const duplicate = await User.findOne({ username }).lean().exec();
      if (duplicate) {
        return res
          .status(400)
          .json({ message: "Username already exists! Please try another one" });
      }
    }

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  try {
    const fileStr = req.body.data;
    const username = req.body.username;

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "profilepics",
    });

    const user = await User.findOneAndUpdate(
      { username },
      { $set: { image: uploadResponse.url } }, // Update the user's image field with the Cloudinary URL
      { new: true }
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with given username" });
    }

    res.json({
      msg: "success",
      image: uploadResponse.url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
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
