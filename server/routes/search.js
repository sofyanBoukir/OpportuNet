const express = require("express");
const isAuth = require("../middlewares/isAuth");
const searchUsersPosts = require("../controllers/searchHome");
const router = express.Router();

router.get("/searchUsersPosts", isAuth, searchUsersPosts);

module.exports = router;
