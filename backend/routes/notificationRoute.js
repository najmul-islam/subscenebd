const express = require("express");
const router = express.Router();

const {
  getAllNotification,
  editNotification,
} = require("../controllers/notificationController");

const { isUser } = require("../middlewares/authMiddleware");

router.route("/").get(isUser, getAllNotification);
router.route("/seen").put(isUser, editNotification);

module.exports = router;
