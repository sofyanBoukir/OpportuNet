const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { getUserNotifications, deleteNotification } = require("../controllers/notification");
const router = express.Router();

router.get("/getUserNotifications",isAuth,getUserNotifications)
router.delete("/deleteNotification/:notificationId",isAuth,deleteNotification)
module.exports = router;