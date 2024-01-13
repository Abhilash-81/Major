const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersControllers.js");
const { protect } = require("../middleware/authMiddleware.js");

router.get("/", userController.getUsers);
// router.post("/register", userController.registerUser);
// router.post("/auth", userController.authUser);
// router.post("/logout", userController.logoutUser);
router.get("/profile", protect, userController.getUserProfile);
router.put("/profile", protect, userController.updateUserProfile);
router.delete("/profile", protect, userController.deleteUser);
router.get("/:username", userController.getUser);

module.exports = router;
