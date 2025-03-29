const express = require("express");
const {
  signUp,
  sendResetLink,
  resetPassword,
  signIn,
  logout,
  getUserData,
  checkVcode,
  signInButNotVerified,
  isNewUser,
  getUsers,
  deleteUser,
} = require("../controllers/auth");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.get("/getUserData", isAuth, getUserData);
router.get("/isNewUser", isAuth, isNewUser);
router.post("/signIn", signIn);
router.post("/signInNotVerified", signInButNotVerified);
router.post("/signUp", signUp);
router.post("/checkVCode", checkVcode);
router.post("/sendResetLink", sendResetLink);
router.post("/resetPassword", resetPassword);
router.post("/logout", logout);
router.get("/getUsers", isAuth, isAdmin, getUsers);
router.delete("/deleteUser/:userId", isAuth, isAdmin, deleteUser);

module.exports = router;
