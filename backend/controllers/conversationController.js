const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
// const io = require("../config/socketio");

const getAllConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const conversations = await Conversation.find({
    participants: { $in: [userId] },
  })
    .populate("participants", "_id name avatar")
    .populate("lastMessage", "-_id sender receiver text createdAt")
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
    .populate("lastMessage", "sender receiver text createdAt");

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

  // create new message
  const newMessage = await Message.create({
    sender: userId,
    receiver: participantId,
    text,
  });

  // check conversation exist
  const existingConversation = await Conversation.findOneAndUpdate(
    {
      participants: { $all: [userId, participantId] },
    },
    { $set: { lastMessage: newMessage._id } },
    { new: true }
  );

  // if not exist create new one
  if (!existingConversation) {
    const newConversation = await Conversation.create({
      participants: [userId, participantId],
      lastMessage: newMessage._id,
    });

    await newMessage.populate("sender", "_id name avatar");
    await newMessage.populate("receiver", "_id name avatar");

    await newConversation.populate("participants", "_id name avatar");
    await newConversation.populate(
      "lastMessage",
      "sender receiver text createdAt"
    );

    req.io.emit("conversation", {
      conversation: newConversation,
      message: newMessage,
    });

    req.io.emit("message", {
      conversation: newConversation,
      message: newMessage,
    });

    res
      .status(201)
      .json({ conversation: newConversation, message: newMessage });
  }

  await newMessage.populate("sender", "_id name avatar");
  await newMessage.populate("receiver", "_id name avatar");

  await existingConversation.populate("participants", "_id name avatar");
  await existingConversation.populate(
    "lastMessage",
    "sender receiver text createdAt"
  );

  io.emit("conversation", {
    conversation: existingConversation,
    message: newMessage,
  });

  res
    .status(200)
    .json({ conversation: existingConversation, message: newMessage });
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
