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

    const posts = await Post.find({
      user : { $ne: userId},
      $or:[
      {tags: { $in: userHashTags }},
      {mentions : { $in : user.following}},
      {user : {$in : user.following}},
      {likes : {$in : user.following}},
    ]})
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
        { role : {$ne: 'admin'}},
        { isVerified : true},
        {
          $or: [
            { interests: { $in: user.interests } },
            { following: { $in: user.following } },
          ],
        },
      ],
    })
      .select("name headLine profile_picture profilePictureUrl")
      .limit(6)
      .sort({followers:-1});

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


const markPostAsSeen = async (request,response) =>{
  try{
    const userId = request.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }

    const { postId } = request.params;
    const post = await Post.findById(postId);

    if(post){
      if(user.seenPosts.includes(postId)){
        return;
      }else{
        user.seenPosts.push(postId);
        user.save()
        return response.json({
          'message' : 'Marked as seen!'
        })
      }
    }

  }catch(err){
    return response.status(500).json({
      'message' : err.messasge
    })
  }
}

module.exports = { getFeed, getSuggesstedUsers, markPostAsSeen };
