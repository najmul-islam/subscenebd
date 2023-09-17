const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");

const getAllNotification = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const notifications = await Notification.find({ receiver: userId })
    .populate("receiver", "_id name avatar")
    .populate("sender", "_id name avatar")
    .populate("subtitle", "_id title poster_path")
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json(notifications);
});

const editNotification = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await Notification.updateMany(
    { receiver: userId, seen: false },
    { seen: true }
  );

  // Query for the updated documents
  const notifications = await Notification.find({
    receiver: userId,
    seen: true,
  })
    .populate("receiver", "_id name avatar")
    .populate("sender", "_id name avatar")
    .populate("subtitle", "_id title poster_path")
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json(notifications);
});

module.exports = {
  getAllNotification,
  editNotification,
};
