const express = require("express");
const { addAdmin, getAdmins } = require("../controllers/admin");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.post("/addAdmin", isAuth, isAdmin, addAdmin);
router.get("/getAdmins", isAuth, isAdmin, getAdmins);

module.exports = router;
