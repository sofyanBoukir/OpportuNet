const express = require("express");
const isAuth = require("../middlewares/isAuth");
const {toggleFollow, getFollowers, getFollowing, removeFollower, getMultualFollows} = require("../controllers/follow");
const router = express.Router();

router.get("/getFollowers",isAuth,getFollowers)
router.get("/getFollowing",isAuth,getFollowing)
router.get("/getMultualFollowing/:profileId",isAuth,getMultualFollows)
router.put("/toggleFollow",isAuth,toggleFollow)
router.delete("/removeFollower/:followerId",isAuth,removeFollower)

module.exports = router;