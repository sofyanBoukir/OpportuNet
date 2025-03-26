const express = require("express");
const isAuth = require("../middlewares/isAuth");
const {
  searchUsers,
  searchPosts,
  searchForJob,
} = require("../controllers/search");
const router = express.Router();

router.get("/searchUsers", isAuth, searchUsers);
router.get("/searchPosts", isAuth, searchPosts);
router.get("/searchForJobs", isAuth, searchForJob);
module.exports = router;
