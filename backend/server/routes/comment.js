const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { commentOnPost, getComments } = require("../controllers/comment");
const router = express.Router();

router.get("/getPostComments/:postId",isAuth,getComments)
router.post("/commentOnPost/:postId",isAuth,commentOnPost)
// router.delete("/deletePost/:postId",isAuth,deletePost)
module.exports = router;