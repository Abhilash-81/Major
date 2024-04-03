import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserProfile,
  updateUserProfile,
  getUserWithId,
  deleteUser,
  getUser,
  updateProfile,
} from "../controllers/usersControllers.js";

router.get("/", getUsers);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.delete("/profile", deleteUser);
router.get("/v1/:id", getUserWithId);
router.get("/:username", getUser);
router.post("/profile", updateProfile);

export default router;
