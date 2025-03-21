const express = require("express");
const isAuth = require("../middlewares/isAuth");
const {toggleFollow, getFollowers, getFollowing} = require("../controllers/follow");
const router = express.Router();

router.get("/getFollowers",isAuth,getFollowers)
router.get("/getFollowing",isAuth,getFollowing)
router.put("/toggleFollow",isAuth,toggleFollow)

module.exports = router;