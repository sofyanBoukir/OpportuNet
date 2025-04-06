const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { getUserNotifications, deleteNotification, makeNotificationsSeen } = require("../controllers/notification");
const router = express.Router();

router.get("/getUserNotifications",isAuth,getUserNotifications)
router.put("/makeNotificationsSeen",isAuth,makeNotificationsSeen)
router.delete("/deleteNotification/:notificationId",isAuth,deleteNotification)

module.exports = router;