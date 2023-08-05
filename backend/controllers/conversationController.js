const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

const getAllConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const conversations = await Conversation.find({
    participants: userId,
  })
    .populate("participants", "_id name avatar")
    .populate("lastMessage")
    .sort({ lastMessageTime: -1 });

  res.status(200).json(conversations);
});

// const getSearchConversations = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const partnerId = req.params.partnerId;

//   const conversations = await Conversation.find({
//     participants: { $all: [loggedInUserId, userId] },
//   })
//     .populate("participants", "_id name avatar")
//     .populate("lastMessage")
//     .sort({ lastMessageTime: -1 });

//   res.status(200).json(conversations);
// });

// const getSingleConversations = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   const conversations = await Conversation.find({
//     participants: userId,
//   })
//     .populate("participants", "_id name avatar")
//     .populate("lastMessage")
//     .sort({ lastMessageTime: -1 });

//   res.status(200).json(conversations);
// });

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
  const { participantId } = req.body;
  const userId = req.user._id;

  const participant = await User.findById(userId);
  const user = await User.findById(userId);

  const existingConversation = await Conversation.findOne({
    participants: { $all: [userId, participantId] },
  });

  if (existingConversation) {
    return res.status(200).json(existingConversation);
  }

  const newConversation = await Conversation.create({
    participants: [userId, participantId],
  });

  // if (newConversation) {
  //   const participant = await User.findByIdAndUpdate(
  //     participantId,
  //     {
  //       $push: { conversations: newConversation._id },
  //     },
  //     { new: true, useFindAndModify: false }
  //   );
  //   const user = await User.findByIdAndUpdate(
  //     userId,
  //     {
  //       $push: { conversations: newConversation._id },
  //     },
  //     { new: true, useFindAndModify: false }
  //   );
  // }

  res.status(200).json(newConversation);
});

module.exports = {
  getAllConversations,
  // getSearchConversations,
  getSingleConversations,
  createConversation,
};
