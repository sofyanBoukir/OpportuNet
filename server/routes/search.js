const express = require("express");
const isAuth = require("../middlewares/isAuth");
const {searchUsersPosts, searchForJob} = require("../controllers/search");
const router = express.Router();

router.get("/searchUsersPosts", isAuth, searchUsersPosts);
router.get('/searchForJobs', isAuth,searchForJob)
module.exports = router;
