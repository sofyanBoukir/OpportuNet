const express = require("express");
const isAuth = require("../middlewares/isAuth");
const getSavedPosts = require("../controllers/saved");
const router = express.Router();

router.get("/getSavedPosts",isAuth,getSavedPosts)

module.exports = router;