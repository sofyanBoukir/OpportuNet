const express = require("express");

const isAuth = require("../middlewares/isAuth");
const {
  addReport,
  getAllReports,
  deleteReport,
} = require("../controllers/report");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.post("/addReport/:postId", isAuth, addReport);
router.get("/getAllReports", isAuth, isAdmin, getAllReports);
router.delete("/deleteReport/:postId", isAuth, isAdmin, deleteReport);

module.exports = router;
