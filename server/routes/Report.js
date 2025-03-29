const express = require("express");

const isAuth = require("../middlewares/isAuth");
const { addReport, getAllReports } = require("../controllers/Report");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.post("/addReport", isAuth, addReport);
router.get("/getAllReports", isAuth, isAdmin, getAllReports);

module.exports = router;
