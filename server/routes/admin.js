const express = require("express");
const addAdmin = require("../controllers/admin");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.post("/addAdmin", isAuth, isAdmin, addAdmin);

module.exports = router;
