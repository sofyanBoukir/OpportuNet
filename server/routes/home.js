const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { getFeed } = require("../controllers/home");
const router = express.Router();

router.get("/getFeed",isAuth,getFeed)

module.exports = router;