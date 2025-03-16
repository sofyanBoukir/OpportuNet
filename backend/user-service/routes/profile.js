const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { completeRegistration, updateInfo } = require("../controllers/profile");
const router = express.Router();
const upload = require('../upload')

router.put("/completeRegistration",isAuth,completeRegistration)
router.put("/updateInfo",isAuth,upload.single("profile_picture"),updateInfo)

module.exports = router;