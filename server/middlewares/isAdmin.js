const isAdmin = (request, response, next) => {
  try {
    const userRole = request.user.role;
    if (userRole !== "admin") {
      return response.status(401).json({
        message: "Unauthorized",
      });
    }
    return next();
  } catch (err) {
    return response.json({
      message: err.message,
    });
  }
};

module.exports = isAdmin;
