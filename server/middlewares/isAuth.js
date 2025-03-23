const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (request, response, next) => {
  try {
    const token = request.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Unauthorized",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return response.status(401).json({
          message: err.message,
        });
      }

      request.user = user;
      return next();
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = isAuth;
