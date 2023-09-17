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

  const total = await Notification.countDocuments({});
  const unseenNotificatons = await Notification.countDocuments({ seen: false });

  res.status(200).json({
    notifications,
    unseenNotificatons,
    total,
    page,
    limit,
  });
});

const editNotification = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  // const notifications = await Notification.find({
  //   receiver: userId,
  //   seen: false,
  // });

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

  // await Notification.populate(notifications, [
  //   { path: "receiver", select: "_id name avatar" },
  //   { path: "sender", select: "_id name avatar" },
  //   { path: "subtitle", select: "_id title poster_path" },
  // ]);

  // await notifications.populate("receiver", "_id name avatar");
  // await notifications.populate("sender", "_id name avatar");
  // await notifications.populate("subtitle", "_id title poster_path");

  // if (notifications) {
  //   req.io.emit("notifications", {
  //     notifications,
  //   });
  // }

  res.status(200).json(notifications);
});

module.exports = {
  getAllNotification,
  editNotification,
};
