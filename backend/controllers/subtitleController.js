const asyncHandler = require("express-async-handler");
const Subtitle = require("../models/subtitleModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");

// get all sub
const getAllSubtitle = asyncHandler(async (req, res) => {
  const { type, media_type } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let querySubtitle = Subtitle.find({});

  if (type === "latest") {
    querySubtitle = querySubtitle.sort({ createdAt: -1 });
  } else if (type === "popular") {
    const thrityDaysAgo = new Date();
    thrityDaysAgo.setDate(thrityDaysAgo.getDate() - 30);
    querySubtitle = querySubtitle
      .where({ createdAt: { $gte: thrityDaysAgo } })
      .sort({ downloads: -1 });
  }

  if (media_type) {
    if (media_type === "all") {
    } else {
      querySubtitle = querySubtitle.where({ media_type });
    }
  }

  querySubtitle = querySubtitle
    .populate("user", "_id name avatar followers createdAt")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const subtitles = await querySubtitle.exec();

  let total;
  if (media_type === "all") {
    total = await Subtitle.countDocuments({});
  } else if (media_type === "movie") {
    total = await Subtitle.countDocuments({ media_type });
  } else if (media_type === "series") {
    total = await Subtitle.countDocuments({ media_type });
  } else if (media_type === "short-film") {
    total = await Subtitle.countDocuments({ media_type });
  } else if (media_type === "music") {
    total = await Subtitle.countDocuments({ media_type });
  } else {
    total = 0;
  }

  res.status(200).json({
    total,
    page,
    limit,
    subtitles,
  });
});

const searchSubtitle = asyncHandler(async (req, res) => {
  const { title } = req.query;

  let querySubtitle = Subtitle.find({});

  if (title) {
    querySubtitle = querySubtitle.or([
      { title: { $regex: title, $options: "i" } },
    ]);
  }

  const subtitles = await querySubtitle
    .populate("user", "_id name avatar followers createdAt")
    .sort({ createdAt: -1 })
    .exec();
  res.status(200).json(subtitles);
});

// get sigle sub
const getSingleSubtitle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subtitle = await Subtitle.findById(id)
    .populate("user", "_id name avatar followers createdAt")
    .populate("comments.commentBy", "_id name avatar")
    .exec();

  res.status(200).json(subtitle);
});

// create sub
const createSubtitle = asyncHandler(async (req, res) => {
  const {
    tmdbId,
    title,
    // original_title,
    description,
    release_name,
    release_type,
    release_date,
    media_type,
    backdrop_path,
    poster_path,
    genres,
  } = req.body;

  const mime_type = req.mime_type;
  const subtitle_link = req.subtitle_link;

  if (!title && !year) {
    res.status(400);
    throw new Error("please title and year field");
  }

  // find user
  const user = await User.findById(req.user._id);

  // create sub
  const newSubtitle = await Subtitle.create({
    user: req.user._id,
    tmdbId,
    subtitle_link,
    title,
    // original_title,
    description,
    release_name: JSON.parse(release_name),
    release_type,
    release_date,
    mime_type,
    media_type,
    backdrop_path,
    poster_path,
    genres: JSON.parse(genres),
  });

  // update user.subtitles with subtitle id
  const updatedSubtitle = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { subtitles: newSubtitle._id },
    },
    { new: true, useFindAndModify: false }
  );

  res.status(200).json(updatedSubtitle);
});

// update sub
const updateSubtitle = asyncHandler(async (req, res) => {
  const subtitle = await Subtitle.findById(req.params.id);

  if (!subtitle) {
    res.status(400);
    throw new Error("Subtitle not found");
  }

  // check for user

  const updatedSubtitle = await Subtitle.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedSubtitle);
});

// like / dislike a subtitle
const likeSubtitle = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;
  const userId = req.user._id;
  const subtitleId = req.params.id;

  const subtitle = await Subtitle.findById(subtitleId);

  // remove user dislike
  if (subtitle.dislikes.includes(userId)) {
    await subtitle.updateOne({
      $pull: { dislikes: userId },
    });
  }

  // add user like
  if (!subtitle.likes.includes(userId)) {
    const updatedSubtitle = await subtitle.updateOne({
      $push: { likes: userId },
    });

    if (updatedSubtitle && receiverId != userId) {
      const notification = await Notification.create({
        receiver: receiverId,
        sender: userId,
        subtitle: subtitleId,
        action: "likeSubtitle",
        seen: false,
      });
    }

    res.status(200).json(updatedSubtitle);
  } else {
    const updatedSubtitle = await subtitle.updateOne({
      $pull: { likes: req.user._id },
    });
    res.status(200).json(updatedSubtitle);
  }
});

const dislikeSubtitle = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;
  const userId = req.user._id;
  const subtitleId = req.params.id;

  const subtitle = await Subtitle.findById(subtitleId);

  // remove user like
  if (subtitle.likes.includes(userId)) {
    await subtitle.updateOne({
      $pull: { likes: userId },
    });
  }

  // add user dislike
  if (!subtitle.dislikes.includes(userId)) {
    const updatedSubtitle = await subtitle.updateOne({
      $push: { dislikes: userId },
    });

    if (updatedSubtitle && receiverId != userId) {
      // create notification
      const notification = await Notification.create({
        receiver: receiverId,
        sender: userId,
        action: "dislikeSubtitle",
        subtitle: subtitleId,
        seen: false,
      });

      console.log("notification", notification);
    }

    res.status(200).json(updatedSubtitle);
  } else {
    const updatedSubtitle = await subtitle.updateOne({
      $pull: { dislikes: req.user._id },
    });

    res.status(200).json(updatedSubtitle);
  }
});

// delete subtitle
const deleteSubtitle = asyncHandler(async (req, res) => {
  const subtitle = await Subtitle.findById(req.params.id);

  if (!subtitle) {
    res.status(400);
    throw new Error("Subtitle not found");
  }

  // check for user
  // make sure the logged in user matches the subtitle user

  await subtitle.remove();

  res.status(200).json({ id: req.params.id });
});

// download subtitle count
const downloadSubtitle = asyncHandler(async (req, res) => {
  const subtitleId = req.params.id;

  const subtitle = await Subtitle.findByIdAndUpdate(
    subtitleId,
    {
      $inc: { downloads: 1 },
    },
    { new: true }
  );

  res.status(200).json(subtitle);
});

const commentSubtitle = asyncHandler(async (req, res) => {
  const { comment, receiverId } = req.body;
  const subtitleId = req.params.id;
  const senderId = req.user._id;
  const newComment = { text: comment, commentBy: req.user._id };

  const updatedSubtitle = await Subtitle.findByIdAndUpdate(
    subtitleId,
    {
      $push: { comments: newComment },
    },
    { new: true }
  ).populate("comments.commentBy", "_id name avatar");

  if (updatedSubtitle && receiverId != senderId) {
    const notification = await Notification.create({
      receiver: receiverId,
      sender: senderId,
      action: "commentSubtitle",
      subtitle: subtitleId,
      seen: false,
    });

    await notification.populate("receiver", "_id name avatar");
    await notification.populate("sender", "_id name avatar");
    await notification.populate("subtitle", "_id title poster_path");

    req.io.emit("notification", {
      notification,
    });
  }

  res.status(200).json(updatedSubtitle);
});

const editCommentSubtitle = asyncHandler(async (req, res) => {
  const newCommentText = req.body.text;
  const commentId = req.params.commentId;
  const subtitle = await Subtitle.findById(req.params.id);

  const commentIndex = subtitle.comments.findIndex(
    (comment) => comment._id.toString() === commentId
  );

  if (commentIndex === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }

  subtitle.comments[commentIndex].text = newCommentText;

  const updatedSubtitle = await subtitle.save();

  res.status(200).json(updatedSubtitle);
});

const delteCommentSubtitle = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;

  const subtitle = await Subtitle.findById(req.params.id);

  if (!subtitle) {
    return res.status(404).json({ error: "Subtitle not found" });
  }

  const commentIndex = subtitle.comments.findIndex(
    (comment) => comment._id.toString() === commentId
  );
  if (commentIndex === -1) {
    return res.status(404).json({ error: "comment not found" });
  }

  // remove the comment from the comment array
  subtitle.comments.splice(commentIndex, 1);

  const updatedSubtitle = await subtitle.save();

  res.status(200).json(updatedSubtitle);
});

module.exports = {
  getAllSubtitle,
  getSingleSubtitle,
  searchSubtitle,
  createSubtitle,
  updateSubtitle,
  likeSubtitle,
  dislikeSubtitle,
  deleteSubtitle,
  downloadSubtitle,
  commentSubtitle,
  editCommentSubtitle,
  delteCommentSubtitle,
};
