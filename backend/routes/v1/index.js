const express = require("express");
const router = express.Router();
const {
  createTweet,
  getAllTweets,
} = require("../../controllers/tweetController");

router.post("/tweets", createTweet);
router.get("/communities", getAllTweets);

module.exports = router;
