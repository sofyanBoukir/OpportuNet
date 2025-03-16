const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router.getUserPosts("/getUserPosts",isAuth)
router.getPost("/getPost/:postId",isAuth)
router.post("/addPost",isAuth)
router.delete("/deletePost",isAuth)

module.exports = router;