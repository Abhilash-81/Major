const Like = require("../models/like");
const CrudRepository = require("./crud-repository");

class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }
  async findByUserAndLikable(data) {
    try {
      const like = await Like.findOne(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LikeRepository;
