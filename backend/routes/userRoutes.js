const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersControllers.js");
const { protect } = require("../middleware/authMiddleware.js");

router.get("/", userController.getUsers); //done
router.post("/register", userController.registerUser); //done
router.post("/login", userController.authUser); //done
router.post("/logout", userController.logoutUser); //done
router.get("/profile", protect, userController.getUserProfile);
router.put("/profile", protect, userController.updateUserProfile);
router.delete("/profile", protect, userController.deleteUser); //done
router.get("/:username", userController.getUser);

module.exports = router;
