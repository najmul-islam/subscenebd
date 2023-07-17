const path = require("path");
const asyncHandler = require("express-async-handler");
const Subtitle = require("../models/subtitleModel");
const User = require("../models/userModel");

// get all sub
const getAllSubtitle = asyncHandler(async (req, res) => {
  const subtitles = await Subtitle.find({})
    .populate("user", "_id name")
    .sort({ createdAt: -1 });

  res.status(200).json(subtitles);
});

// get sigle sub
const getSingleSubtitle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subtitle = await Subtitle.findById({ _id: id });

  res.status(200).json(subtitle);
});

// // get user subtitle
// const getUserSubtitle = asyncHandler(async (req, res) => {
//   const subtitles = await Subtitle.find({ user: req.user.id });
// });

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
  const subtitle = await Subtitle.findById(req.params.id);

  // remove user dislike
  if (subtitle.dislikes.includes(req.user._id)) {
    await subtitle.updateOne({
      $pull: { dislikes: req.user._id },
    });
  }

  // add user like
  if (!subtitle.likes.includes(req.user._id)) {
    const updatedSubtitle = await subtitle.updateOne({
      $push: { likes: req.user._id },
    });
    res.status(200).json(updatedSubtitle);
  } else {
    const updatedSubtitle = await subtitle.updateOne({
      $pull: { likes: req.user._id },
    });
    res.status(200).json(updatedSubtitle);
  }
});

const dislikeSubtitle = asyncHandler(async (req, res) => {
  const subtitle = await Subtitle.findById(req.params.id);

  // remove user like
  if (subtitle.likes.includes(req.user._id)) {
    await subtitle.updateOne({
      $pull: { likes: req.user._id },
    });
  }

  // add user dislike
  if (!subtitle.dislikes.includes(req.user._id)) {
    const updatedSubtitle = await subtitle.updateOne({
      $push: { dislikes: req.user._id },
    });

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
const downloadSubtitleCount = asyncHandler(async (req, res) => {
  const subtitle = await Subtitle.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { downloads: 1 },
    },
    { new: true }
  );

  res.status(200).json(subtitle);
});

// download sub
const downloadSubtitle = asyncHandler(async (req, res) => {
  const subtitle = await Subtitle.findById(req.params.id);
  res.set({
    "Content-Type": subtitle.mime_type,
  });
  res.sendFile(path.join(__dirname, "../public", subtitle.sublink));
});

module.exports = {
  getAllSubtitle,
  getSingleSubtitle,
  createSubtitle,
  updateSubtitle,
  likeSubtitle,
  dislikeSubtitle,
  deleteSubtitle,
  downloadSubtitle,
  downloadSubtitleCount,
};
