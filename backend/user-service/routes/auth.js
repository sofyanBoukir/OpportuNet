const express = require("express");
const { signUp, sendResetLink, resetPassword, sendVCode, signIn, logout } = require("../controllers/auth");
const router = express.Router();


router.post("/signIn",signIn);
router.post("/sendCode",sendVCode);
router.post("/signUp",signUp);
router.post("/sendResetLink",sendResetLink);
router.post("/resetPassword",resetPassword);
router.post("/logout",logout)

module.exports = router;