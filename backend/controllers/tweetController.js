const TweetService = require("../Services/tweet-service");
const asyncHandler = require("express-async-handler");

const tweetService = new TweetService();

const createTweet = asyncHandler(async (req, res) => {
  try {
    const response = await tweetService.create(req.body);
    return res.status(201).json({
      sucess: true,
      message: "Sucessfully created a new Tweet",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong",
      data: {},
      err: error,
    });
  }
});

module.exports = {
  createTweet,
};
