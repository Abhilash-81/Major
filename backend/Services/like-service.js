import {
  LikeRespository,
  TweetRepository,
  CommentRepository,
} from "../repository/index.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRespository();
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    if (userId === undefined) {
      throw new Error("Please login");
    }

    let likeable;
    if (modelType === "Tweet") {
      likeable = await this.tweetRepository.find(modelId);
    } else if (modelType === "Comment") {
      likeable = await this.commentRepository.find(modelId);
    } else {
      throw new Error("Unknown model type");
    }

    const existingLike = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });

    let isAdded;
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      await likeable.save();
      await this.likeRepository.destroy(existingLike._id);
      isAdded = false;
    } else {
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();
      isAdded = true;
    }

    return isAdded;
  }
}

export default LikeService;
