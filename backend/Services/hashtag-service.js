import { HashtagRepository } from "../repository/index.js";

class HashtagService {
  constructor() {
    this.hashtagRepository = new HashtagRepository();
  }

  async getAllHashtags() {
    try {
      const hashtags = await this.hashtagRepository.getAll();
      return hashtags;
    } catch (error) {
      console.log(error);
    }
  }
}

export default HashtagService;
