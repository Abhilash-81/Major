import express from "express";

import {
  createRating,
  getRating,
} from "../../controllers/rating-controller.js";

import {
  createTweet,
  getTweet,
  getAllTweets,
} from "../../controllers/tweet-controller.js";
import {
  getAllHashtags,
  getHashtag,
} from "../../controllers/hashtag-controller.js";
import { toggleLike } from "../../controllers/like-controller.js";
import { createComment } from "../../controllers/comment-controller.js";
import { signup, login } from "../../controllers/auth-controller.js";

const router = express.Router();

router.post("/tweets", createTweet);
router.get("/tweets", getAllTweets);
router.get("/tweets/:id", getTweet);
router.get("/hashtags", getAllHashtags);
router.get("/hashtags/:id", getHashtag);
router.post("/likes/toggle", toggleLike);
router.post("/comments", createComment);
router.get("/comments/:id", getTweet);
router.post("/signup", signup);
router.post("/login", login);
router.post("/ratings", createRating);
router.get("/ratings/:userId", getRating);

export default router;
