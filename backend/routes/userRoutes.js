import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUser,
} from "../controllers/usersControllers.js";

router.get("/", getUsers);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.delete("/profile", deleteUser);
router.get("/:username", getUser);

export default router;
