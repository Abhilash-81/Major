const Hashtag = require("../models/hashtags");

class HashtagRepository {
  async create(data) {
    try {
      const tag = await Hashtag.create(data);
      return tag;
    } catch (error) {
      console.log(error);
    }
  }

  async bulkCreate(data) {
    try {
      const tags = await Hashtag.insertMany(data);
    } catch (error) {
      console.log(error);
    }
  }
  async get(id) {
    try {
      const tag = await Hashtag.findById(id);
      return tag;
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      const response = await Hashtag.findByIdAndRemove(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findByName(titleList) {
    try {
      const tags = await Hashtag.find({
        title: titleList,
      }).select("title -_id");
      return tags;
    } catch (error) {
      console.log(error);
    }
  }

  //   async getAll(offset, limit) {
  //     try {
  //       const tags = await Hashtag.find().skip(offset).limit(limit);
  //       return tags;
  //     } catch (error) {
  //       conosle.log(error);
  //     }
  //   }
}

module.exports = HashtagRepository;
