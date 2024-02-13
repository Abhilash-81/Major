import { LikeRespository, TweetRepository } from "../repository/index.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRespository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    if (userId === undefined) {
      throw new Error("Please login");
    }

    let likeable;
    if (modelType === "Tweet") {
      likeable = await this.tweetRepository.find(modelId);
    } else if (modelType === "Comment") {
      // Handle comment logic if needed
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
      // Unlike the entity
      likeable.likes.pull(existingLike._id); // Remove the like from the likes array
      await likeable.save();
      await this.likeRepository.destroy(existingLike._id); // Delete the like entry
      isAdded = false;
    } else {
      // Like the entity
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike); // Add the new like to the likes array
      await likeable.save();
      isAdded = true;
    }

    return isAdded;
  }
}

export default LikeService;
