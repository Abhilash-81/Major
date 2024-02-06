const express = require("express");
const router = express.Router();

const {
  createTweet,
  getAllTweets,
} = require("../../controllers/tweetController");

const { toggleLike } = require("../../controllers/likeController");

router.post("/tweets", createTweet);
router.get("/communities", getAllTweets);
router.post("/likes", toggleLike);

module.exports = router;
