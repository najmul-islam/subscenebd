const express = require("express");
const router = express.Router();

const {
  getAllConversations,
  getSingleConversations,
  createConversation,
  editConversation,
} = require("../controllers/conversationController");

const { isUser } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(isUser, getAllConversations)
  .post(isUser, createConversation);

router
  .route("/:conversationId")
  .get(isUser, getSingleConversations)
  .put(isUser, editConversation);

module.exports = router;
