const express = require("express");
const isAuth = require("../middlewares/isAuth");
const completeRegistration = require("../controllers/profile");
const router = express.Router();

router.put("/completeRegistration",isAuth,completeRegistration);


module.exports = router;