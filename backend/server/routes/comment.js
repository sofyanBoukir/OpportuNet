const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { commentOnPost, getComments, deleteComment } = require("../controllers/comment");
const router = express.Router();

router.get("/getPostComments/:postId",isAuth,getComments)
router.post("/commentOnPost/:postId",isAuth,commentOnPost)
router.delete("/deleteComment/:postId/:commentId",isAuth,deleteComment)
module.exports = router;