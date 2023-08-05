const express = require("express");
const router = express.Router();
const {
  allMessages,
  createMessage,
} = require("../controllers/messageController");
const { isUser } = require("../middlewares/authMiddleware");

router
  .route("/:partnerId")
  .get(isUser, allMessages)
  .post(isUser, createMessage);

module.exports = router;
