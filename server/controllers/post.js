const Notification = require("../models/Notification");
const Post = require("../models/Post");
const User = require("../models/User");
const notifyOnlineUser = require("../sockets/real-time-notifications");
const { getIO } = require("../sockets/socket");

const getPost = async (request, response) => {
  try {
    const { postId } = request.params;

    const post = await Post.findById(postId).populate(
      "user",
      "name profile_picture headLine"
    );
    if (post) {
      return response.json({
        post,
      });
    }

    return response.status(404).json({
      message: "Post not found",
    });
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};
const addPost = async (request, response) => {
  try {
    const { content, tags, mentionsIds } = request.body;
    const imageUrl = request.file ? `/posts/${request.file.filename}` : null;

    const userId = request.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "user not found",
      });
    }

    const newPost = new Post({
      user: userId,
      content,
      tags,
      mentions: mentionsIds,
      image: imageUrl,
    });

    await newPost.save();
    const io = getIO();
    if (mentionsIds) {
      const notifications = mentionsIds.map((mentionId) => {
        const notification = new Notification({
          user: mentionId,
          from_user: userId,
          post: newPost._id,
          message: "Mentioned you in a post",
        });
        notifyOnlineUser(io, mentionId, notification);
        return notification;
      });

      await Notification.insertMany(notifications);
      return response.json({
        message: "Posted successfully!",
      });
    }

    return response.json({
      message: "Posted successfully!",
    });
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

const deletePost = async (request, response) => {
  try {
    const userId = request.user.id;
    const { postId } = request.params;
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "user not found",
      });
    }

    const post = await Post.findOne({
      $and: [{ user: userId }, { _id: postId }],
    });

    if (post) {
      await Post.findByIdAndDelete(postId);
      return response.json({
        message: "Post deleted successfully",
      });
    }
    return response.json({
      message: "Posted successfully!",
    });
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

const toggleLike = async (request, response) => {
  try {
    const userId = request.user.id;
    const { postId } = request.params;
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "user not found",
      });
    }

    const postExists = await Post.findById(postId);
    if (!postExists) {
      return response.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = user.likedPosts.includes(postId);

    if (alreadyLiked) {
      const newLikes = postExists.likes.filter(
        (_id) => _id.toString() !== userId
      );
      const newLikesUser = user.likedPosts.filter(
        (_id) => _id.toString() !== postId
      );
      postExists.likes = newLikes;
      user.likedPosts = newLikesUser;
      await postExists.save();
      await user.save();
      return response.json({
        liked: false,
      });
    } else {
      postExists.likes.push(userId);
      user.likedPosts.push(postId);

      await postExists.save();
      await user.save();
      const io = getIO();

      if (postExists.user.toString() !== userId) {
        const newNotification = new Notification({
          user: postExists.user,
          from_user: userId,
          post: postExists._id,
          message: "Liked your post",
        });
        await newNotification.save();
        notifyOnlineUser(io, postExists.user, newNotification);
      }

      return response.status(200).json({
        liked: true,
      });
    }
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

const toggleSave = async (request, response) => {
  try {
    const userId = request.user.id;
    const { postId } = request.params;
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "user not found",
      });
    }

    const postExists = await Post.findById(postId);
    if (!postExists) {
      return response.status(404).json({
        message: "Post not found",
      });
    }

    const alreadySaved = user.savedPosts.includes(postId);

    if (alreadySaved) {
      const newSaves = user.savedPosts.filter((id) => id.toString() !== postId);
      user.savedPosts = newSaves;
      await user.save();
      return response.json({
        saved: false,
      });
    } else {
      user.savedPosts.push(postId);
      await user.save();
      return response.json({
        saved: true,
      });
    }
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getPost,
  addPost,
  deletePost,
  toggleLike,
  toggleSave,
};
