const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
const upload = require("../uploadPosts");
const { addPost, deletePost, getPost } = require("../controllers/post");

router.get("/getPost/:postId",isAuth,getPost)
router.post("/addPost", isAuth, upload.single("image"),addPost);
router.delete("/deletePost/:postId",isAuth,deletePost)
// router.get("/alreadyLiked",isAuth);
module.exports = router;