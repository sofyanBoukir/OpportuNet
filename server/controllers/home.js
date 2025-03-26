const Post = require("../models/Post");
const User = require("../models/User");

const getFeed = async (request, response) => {
  try {
    const userId = request.user.id;
    const user = await User.findById(userId).populate("interests");
    const userHashTags =
      user?.interests.flatMap((interest) => interest.hashtags) || [];

    const page = parseInt(request.query.page) || 1;
    const pageSize = 2;
    const skip = (page - 1) * pageSize;

    // return response.json({
    //     'tags' : userHashTags
    // })
    const posts = await Post.find({
      tags: { $in: userHashTags },
      // _id : { $ne : user.seenPosts},
      // mentions : { $in : user.following}
    })
      .populate("user", "name headLine profile_picture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    return response.json({
      posts: posts,
    });
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

const getSuggesstedUsers = async (request, response) => {
  try {
    const userId = request.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }

    const suggesstedUsers = await User.find({
      $and: [
        { _id: { $ne: userId } },
        { _id: { $nin: user.following } },
        {
          $or: [
            { interests: { $in: user.interests } },
            { followers: { $in: user.followers } },
            { following: { $in: user.following } },
          ],
        },
      ],
    })
      .select("name headLine profile_picture profilePictureUrl")
      .limit(6);

    if (suggesstedUsers) {
      return response.json({
        suggesstedUsers: suggesstedUsers,
      });
    }
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { getFeed, getSuggesstedUsers };
