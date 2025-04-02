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

module.exports = addAdmin;
