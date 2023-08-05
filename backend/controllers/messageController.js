const { Types } = require("mongoose");
const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");

const allMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const partnerId = req.params.partnerId;

  const messages = await Message.find({
    // conversation_id: req.params.conversationId,
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
  const userId = Types.ObjectId(req.user._id);
  const partnerId = Types.ObjectId(req.params.partnerId);
  const { text } = req.body;

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
  });

  conversation.lastMessage = newMessage._id;
  conversation.lastMessageTime = newMessage.createdAt;

  await conversation.save();

  res.status(200).json(newMessage);
});

module.exports = { allMessages, createMessage };
