const Post = require("../models/Post");
const User = require("../models/User");

const searchUsersPosts = async (request, response) => {
  try {
    const userId = request.user.id;
    const { query } = request.query;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({
        message: "user Invalid",
      });
    }

    const users = await User.find({
      $and: [
        { _id: { $ne: userId } },
        { name: { $regex: query, $options: "i" } },
      ],
    });
    if (!users) {
      return response.status(404).json({
        message: "Users Not Found",
      });
    }

    const posts = await Post.find({
      $and: [
        { user: { $ne: userId } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).populate("user", "name profile_picture headLine");
    if (!posts) {
      return response.status(404).json({
        message: "Posts Not Found",
      });
    }

    return response.json({
      users,
      posts,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = searchUsersPosts;
