const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");

const getAllNotification = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const notifications = await Notification.find({ receiver: userId })
    .populate("receiver", "_id name avatar")
    .populate("sender", "_id name avatar")
    .populate("subtitle", "_id title poster_path")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  const total = await Notification.countDocuments({ receiver: userId });
  const unseenNotificatons = await Notification.countDocuments({
    receiver: userId,
    seen: false,
  });

  res.status(200).json({
    notifications,
    unseenNotificatons,
    total,
    page,
    limit,
  });
});

const seenNotification = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

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
    .skip(skip)
    .limit(limit)
    .exec();

  const total = await Notification.countDocuments({ receiver: userId });
  const unseenNotificatons = await Notification.countDocuments({
    receiver: userId,
    seen: false,
  });

  res.status(200).json({
    notifications,
    unseenNotificatons,
    total,
    page,
    limit,
  });
});

const readNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedNotification = await Notification.findByIdAndUpdate(
    id,
    { read: true },
    { new: true }
  );

  if (!updatedNotification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  res.status(200).json(updatedNotification);
});

module.exports = {
  getAllNotification,
  seenNotification,
  readNotification,
};
