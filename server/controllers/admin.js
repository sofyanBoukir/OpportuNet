const User = require("../models/User");
const bcrypt = require("bcrypt");

const addAdmin = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      password: hashedPass,
      role: "admin",
    });
    await admin.save();

    return response.json({
      message: "Admin created successfully!",
    });
  } catch (err) {
    return response.status(500).json({
      message: err.message,
    });
  }
};

const getAdmins = async (request, response) => {
  try {
    const userRole = request.user.role;
    const userId = request.user.id;

    const page = parseInt(request.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const admins = await User.find({
      $and: [{ role: userRole }, { _id: { $ne: userId } }],
    })
      .skip(skip)
      .limit(pageSize)
      .sort({
        createdAt: -1,
      });

    if (!admins) {
      response.status(404).json({
        message: "Users Not found",
      });
    }

    const totalAdmins = await User.countDocuments({
      $and: [{ role: userRole }, { _id: { $ne: userId } }],
    });

    const totalPages = Math.ceil(totalAdmins / pageSize);

    return response.json({
      admins,
      totalAdmins,
      totalPages,
    });
  } catch (err) {
    return response.json({
      message: err.message,
    });
  }
};

module.exports = { addAdmin, getAdmins };
