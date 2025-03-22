const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { getFeed, getSuggesstedUsers } = require("../controllers/home");
const router = express.Router();

router.get("/getFeed",isAuth,getFeed)
router.get("/getSuggesstions",isAuth,getSuggesstedUsers)

module.exports = router;