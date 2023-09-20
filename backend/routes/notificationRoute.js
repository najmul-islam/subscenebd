const express = require("express");
const router = express.Router();

const {
  getAllNotification,
  seenNotification,
  readNotification,
} = require("../controllers/notificationController");

const { isUser } = require("../middlewares/authMiddleware");

router.route("/").get(isUser, getAllNotification);
router.route("/seen").put(isUser, seenNotification);
router.route("/read/:id").patch(isUser, readNotification);

module.exports = router;
