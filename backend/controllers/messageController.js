const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

const allMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const partnerId = req.params.partnerId;

  const messages = await Message.find({
    $or: [
      { $and: [{ sender: userId }, { receiver: partnerId }] },
      { $and: [{ sender: partnerId }, { receiver: userId }] },
    ],
  })
    .populate("sender", "_id name avatar")
    .populate("receiver", "_id name avatar");

  res.status(200).json(messages);
});

const createMessage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const partnerId = req.params.partnerId;
  const { text, createdAt } = req.body;

  const conversation = await Conversation.findOne({
    $and: [{ participants: userId }, { participants: partnerId }],
  });

  if (!conversation) {
    res.status(404);
    throw new Error("Conversation not found");
  }

  // create the new message
  const newMessage = await Message.create({
    sender: userId,
    receiver: partnerId,
    text,
    createdAt,
  });

  conversation.lastMessage = newMessage._id;
  const newConversation = await conversation.save();

  await newMessage.populate("sender", "_id name avatar");
  await newMessage.populate("receiver", "_id name avatar");

  await newConversation.populate("participants", "_id name avatar");
  await newConversation.populate(
    "lastMessage",
    "sender receiver text createdAt"
  );

  req.io.emit("message", {
    conversation: newConversation,
    message: newMessage,
  });

  req.io.emit("conversation", {
    conversation: newConversation,
    message: newMessage,
  });

  res.status(200).json(newMessage);
});

module.exports = { allMessages, createMessage };
