const Report = require("../models/Report");
const User = require("../models/User");

const addReport = async (request, response) => {
  try {
    const userId = request.user.id;
    const { postId } = request.body;

    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "user not found",
      });
    }

    const newPost = new Report({
      user: userId,
      post: postId,
    });
    await newPost.save();

    return response.json({
      message: "Reported successfully!",
    });
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

const getAllReports = async (request, response) => {
  try {
    // const page = parseInt(request.query.page) || 1;
    // const pageSize = 4;
    // const skip = (page - 1) * pageSize;

    const reports = await Report.aggregate([
      { $group: { _id: "$post", total: { $sum: 1 } } },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "_id",
          as: "postInfo",
        },
      },
      {
        $unwind: "$postInfo",
      },
    ]);

    return response.json({
      reports,
    });
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

const deleteReport = async (request, response) => {
  try {
    const { reportId } = request.params;

    await Report.findByIdAndDelete(reportId);

    return response.json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { addReport, getAllReports, deleteReport };
