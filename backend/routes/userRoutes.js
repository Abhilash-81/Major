const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersControllers");

router.get("/", userController.getUsers);
router.post("/", userController.createNewUser);
router.patch("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
