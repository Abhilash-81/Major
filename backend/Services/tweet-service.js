const { TweetRepository, HashtagRepository } = require("../Repository/index");

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    // Extract content and find hashtags in the content
    const content = data.content;
    let tags = content.match(/#[a-zA-Z0-9_]+/g);
    tags = tags.map((tag) => tag.substring(1));
    tags = tags.map((tag) => tag.toLowerCase()); //Converting tags to lowercase
    // Create a tweet
    const tweet = await this.tweetRepository.create(data);

    // Find existing hashtags in the database
    let alreadyPresentTags = await this.hashtagRepository.findByName(tags);

    // Extract titles from alreadyPresentTags
    let titleOfAlreadyPresentTags = alreadyPresentTags.map((tag) => tag.title);

    // Filter out existing tags to get newTags
    let newTags = tags.filter(
      (tag) => !titleOfAlreadyPresentTags.includes(tag)
    );

    // Prepare newTags with titles and associated tweet IDs
    newTags = newTags.map((tag) => {
      return { title: tag, tweets: [tweet.id] };
    });

    // Bulk create newTags in the hashtagRepository
    const response = await this.hashtagRepository.bulkCreate(newTags);
    alreadyPresentTags.forEach((tag) => {
      tag.tweets.push(tweet.id);
      tag.save();
    });
    return tweet;
  }

  async get(tweetId) {
    const tweet = await this.tweetRepository.getWithComments(tweetId);
    return tweet;
  }

  async getAll() {
    const tweets = await this.tweetRepository.getAll(0, 5);
    if (tweets) {
      return tweets;
    }
    res.status(200).json(tweets);
  }
}

module.exports = TweetService;
