const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { getFeed, getSuggesstedUsers, markPostAsSeen } = require("../controllers/home");
const router = express.Router();

router.get("/getFeed",isAuth,getFeed);
router.get("/getSuggesstedUsers",isAuth,getSuggesstedUsers);
router.put("/markPostAsSeen/:postId",isAuth,markPostAsSeen);

module.exports = router;