const { LikeRepository, TweetRepository } = require("../Repository/index");

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    if (modelType === "Tweet") {
      var likeable = await this.tweetRepository.get(modelId).populate("likes");
    } else if (modelType === "Comment") {
      //TODO
    } else {
      throw new Error("unknown model Type");
    }
    const exists = await this.likeRepository.findByUserAndLikable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    if (exists) {
      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.remove();
      var isRemoved = true;
    } else {
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();
      var isRemoved = false;
    }
    return isRemoved;
  }
}

export default LikeService;
