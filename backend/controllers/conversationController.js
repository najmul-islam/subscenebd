const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");

const getAllConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const conversations = await Conversation.find({
    participants: userId,
  })
    .populate("participants", "_id name avatar")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });

  res.status(200).json(conversations);
});

const getSingleConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const partnerId = req.params.partnerId;

  const conversation = await Conversation.findOne({
    $and: [{ participants: userId }, { participants: partnerId }],
  })
    .populate("participants", "_id name avatar")
    .populate("lastMessage");

  if (!conversation) {
    res.status(404);
    throw new Error("Conversation not found");
  }
  res.status(200).json(conversation);
});

const createConversation = asyncHandler(async (req, res) => {
  const { participantId, text } = req.body;
  const userId = req.user._id;

  if (!text) {
    res.status(401);
    throw new Error("Please write one message");
  }

  const existingConversation = await Conversation.findOne({
    participants: { $all: [userId, participantId] },
  });

  if (existingConversation) {
    return res.status(200).json(existingConversation);
  }

  const newMessage = await Message.create({
    sender: userId,
    receiver: participantId,
    text,
  });

  const newConversation = await Conversation.create({
    participants: [userId, participantId],
    lastMessage: newMessage._id,
  });

  await newConversation.populate("lastMessage");

  res.status(200).json(newConversation);
});

const editConversation = asyncHandler(async (req, res) => {
  const { participantId, text } = req.body;
  const { conversationId } = req.params;

  // const updatedConversation = await Conversation.findOneAndUpdate(conversationId,{
  //   lastMessage
  // })
  res.status(200).json({ message: "expirementel" });
});

module.exports = {
  getAllConversations,
  getSingleConversations,
  createConversation,
  editConversation,
};
