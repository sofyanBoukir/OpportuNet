const User = require("../models/User");

const getSavedPosts = async (request, response) => {
    try {
      const userId = request.user.id;
      const page = parseInt(request.query.page) || 1;
      const pageSize = 3;
      const skip = (page - 1) * pageSize;
      const userSavedPosts = await User.findById(userId)
        .select('savedPosts')
        .populate({
          path: "savedPosts",
          select: 'content image',
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "user",
            select: "name headLine profile_picture"
          }
        })
  
      if (!userSavedPosts) {
        return response.status(404).json({
          message: 'User not found'
        });
      }
  
      const totalSavedPosts = userSavedPosts.savedPosts.length;
      const totalPages = Math.ceil(totalSavedPosts / pageSize);
      const lastPage = totalPages;
  
      const paginatedPosts = userSavedPosts.savedPosts.slice(skip, skip + pageSize);
  
      if (paginatedPosts.length > 0) {
        return response.json({
          savedPosts: { savedPosts: paginatedPosts },
          totalSavedPosts: totalSavedPosts,
          lastPage: lastPage
        });
      }
  
      return response.status(404).json({
        message: 'No saved posts with this user'
      });
    } catch (err) {
      return response.status(500).json({
        message: err.message
      });
    }
  };
  

module.exports = getSavedPosts