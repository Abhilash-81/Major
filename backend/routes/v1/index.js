import express from "express";

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

import { authenticate } from "../../middlewares/authenticate.js";

const router = express.Router();

router.post("/tweets", createTweet);
router.get("/tweets/:id", getTweet);
router.get("/hashtags", getAllHashtags);
router.get("/hashtags/:id", getHashtag);

router.post("/likes/toggle", authenticate, toggleLike);

router.post("/comments", authenticate, createComment);

router.post("/signup", signup);

router.post("/login", login);

export default router;

/**
 *
 * user -> unique_id -
 *
 * https://www.mywebsite.com/verifyEmail/skhvbv8w874rte4t
 *
 * verifyEmail/:unique_id -> decrypttoken (unique_id) -> {id: wi4uy, email: w8ery}
 *
 * db -> userid -> unique_id -> createdAt -> isVerified
 */
