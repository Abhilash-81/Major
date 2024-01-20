const { TweetRepository, HashtagRepository } = require("../Repository/index");

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  // async create(data) {
  //   const content = data.content;
  //   let tags = content.match(/#[a-zA-Z0-9_]+/g);
  //   tags = tags.map((tag) => tag.substring(1));
  //   console.log(tags);
  //   const tweet = await this.tweetRepository.create(data);
  //   let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
  //   console.log(alreadyPresentTags, "alreadyPresentTags1");
  //   alreadyPresentTags = [alreadyPresentTags].map((tag) => {
  //     tag.title;
  //   });
  //   console.log(alreadyPresentTags, "alreadyPresentTags2");
  //   let newTags = tags.filter((tag) => {
  //     !alreadyPresentTags.includes(tag);
  //   });
  //   console.log(newTags, "newTags1");
  //   newTags = newTags.map((tag) => {
  //     return { title: tag, tweets: [tweet._id] };
  //   });
  //   console.log(newTags, "newTags2");
  //   const response = await this.hashtagRepository.bulkCreate(newTags);
  //   console.log(response);
  //   return tweet;
  // }
  async create(data) {
    // Extract content and find hashtags in the content
    const content = data.content;
    let tags = content.match(/#[a-zA-Z0-9_]+/g);
    tags = tags.map((tag) => tag.substring(1));
    console.log(tags);

    // Create a tweet
    const tweet = await this.tweetRepository.create(data);

    // Find existing hashtags in the database
    let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
    console.log(alreadyPresentTags, "alreadyPresentTags1");

    // Extract titles from alreadyPresentTags
    alreadyPresentTags = alreadyPresentTags.map((tag) => tag.title);
    console.log(alreadyPresentTags, "alreadyPresentTags2");

    // Filter out existing tags to get newTags
    let newTags = tags.filter((tag) => !alreadyPresentTags.includes(tag));
    console.log(newTags, "newTags1");

    // Prepare newTags with titles and associated tweet IDs
    newTags = newTags.map((tag) => {
      return { title: tag, tweets: [tweet._id] };
    });
    console.log(newTags, "newTags2");

    // Bulk create newTags in the hashtagRepository
    const response = await this.hashtagRepository.bulkCreate(newTags);
    console.log(response);

    return tweet;
  }
}

module.exports = TweetService;
