const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { getFeed, getSuggesstedUsers } = require("../controllers/home");
const router = express.Router();

router.get("/getFeed",isAuth,getFeed)
router.get("/getSuggesstedUsers",isAuth,getSuggesstedUsers)

module.exports = router;