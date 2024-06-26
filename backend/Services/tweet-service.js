import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    const content = data.tweetText;
    const username = data.username;
    const tags = content
      .match(/#[a-zA-Z0-9_]+/g)
      .map((tag) => tag.substring(1).toLowerCase());
    const tweet = await this.tweetRepository.create(data);
    let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
    let titleOfPresenttags = alreadyPresentTags.map((tags) => tags.title);
    let newTags = tags.filter((tag) => !titleOfPresenttags.includes(tag));
    newTags = newTags.map((tag) => {
      return { title: tag, tweets: [tweet.id] };
    });
    await this.hashtagRepository.bulkCreate(newTags);
    alreadyPresentTags.forEach((tag) => {
      tag.tweets.push(tweet.id);
      tag.save();
    });
    tweet?.user?.push(username);
    await tweet.save();
    return tweet;
  }

  async get(tweetId) {
    try {
      const tweet = await this.tweetRepository.getWithComments(tweetId);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllTweets() {
    try {
      const tweets = await this.tweetRepository.getAllTweets();
      return tweets;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TweetService;
