const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  createMessage,
  updateUnseenMessage,
  getUnseenMessage,
} = require("../controllers/messageController");
const { isUser } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(isUser, getUnseenMessage)
  .put(isUser, updateUnseenMessage);
router
  .route("/:partnerId")
  .get(isUser, getAllMessages)
  .post(isUser, createMessage);

module.exports = router;
