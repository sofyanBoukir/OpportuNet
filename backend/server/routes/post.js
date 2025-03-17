const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
const upload = require("../uploadPosts");
const { addPost, getUserPosts } = require("../controllers/post");

router.get("/getUserPosts",isAuth,getUserPosts)
// router.getPost("/getPost/:postId",isAuth)
router.post("/addPost", isAuth, upload.single("image"),addPost);

// router.delete("/deletePost",isAuth)

module.exports = router;