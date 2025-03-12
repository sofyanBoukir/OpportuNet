const express = require("express");
const { signUp, sendResetLink, resetPassword, signIn, logout, getUserData, checkVcode, signInButNotVerified } = require("../controllers/auth");
const router = express.Router();

router.get("/getUserData",getUserData)
router.post("/signIn",signIn);
router.post("/signInNotVerified",signInButNotVerified);
router.post("/signUp",signUp);
router.post("/checkVCode",checkVcode)
router.post("/sendResetLink",sendResetLink);
router.post("/resetPassword",resetPassword);
router.post("/logout",logout);

module.exports = router;