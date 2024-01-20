const express = require("express");
const router = express.Router();
const { createTweet } = require("../../controllers/tweetController");

router.post("/tweets", createTweet);

module.exports = router;
