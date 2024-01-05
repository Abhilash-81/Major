const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersControllers.js");
const { protect } = require("../middleware/authMiddleware.js");

// router.get("/:username", userController.getUser);
router.get("/", userController.getUsers); //done
router.post("/", userController.registerUser); //done
router.post("/auth", userController.authUser); //done
router.post("/logout", userController.logoutUser); //done
router.get("/profile", protect, userController.getUserProfile);
router.put("/profile", protect, userController.updateUserProfile);
router.delete("/", userController.deleteUser); //done

module.exports = router;
