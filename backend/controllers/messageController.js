const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

const getAllMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const partnerId = req.params.partnerId;

  const messages = await Message.find({
    $or: [
      { $and: [{ sender: userId }, { receiver: partnerId }] },
      { $and: [{ sender: partnerId }, { receiver: userId }] },
    ],
  })
    .populate("sender", "_id name avatar seen read")
    .populate("receiver", "_id name avatar seen read");

  res.status(200).json(messages);
});

const getUnseenMessage = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const unseenMessage = await Message.countDocuments({
    receiver: userId,
    seen: false,
  });
  res.status(200).json({ unseenMessage });
});

const updateUnseenMessage = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await Message.updateMany({ receiver: userId, seen: false }, { seen: true });

  // const messages = await Message.find({
  //   $or: [
  //     { $and: [{ sender: userId }, { receiver: partnerId }] },
  //     { $and: [{ sender: partnerId }, { receiver: userId }] },
  //   ],
  // })
  //   .populate("sender", "_id name avatar")
  //   .populate("receiver", "_id name avatar");

  const unseenMessage = await Message.countDocuments({
    receiver: userId,
    seen: false,
  });
  res.status(200).json({ unseenMessage });
});

// const readMessage = asyncHandler(async(req, res) =>{
//   const
// })

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
    seen: false,
    read: false,
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

module.exports = {
  getAllMessages,
  getUnseenMessage,
  updateUnseenMessage,
  createMessage,
};
