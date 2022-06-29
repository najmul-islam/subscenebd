const path = require("path");
const asyncHandler = require("express-async-handler");
const Subtitle = require("../models/subtitleModel");

// get all sub
const getAllSubtitle = asyncHandler(async (req, res) => {
  const subtitles = await Subtitle.find({});

  res.status(200).json(subtitles);
});

// get sigle sub
const getSingleSubtitle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const subtitle = await Subtitle.findById({ _id: id });

  res.status(200).json(subtitle);
});

// create sub
const createSubtitle = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    releaseName,
    releaseType,
    releaseDate,
    mediaType,
    posterPath,
    genres,
  } = req.body;

  const sublink = req.sublink;
  const mimetype = req.mimetype;

  if (!title && !year) {
    res.status(400);
    throw new Error("please title and year field");
  }

  const newSubtitle = await Subtitle.create({
    sublink,
    title,
    description,
    releaseName,
    releaseType,
    releaseDate,
    mimetype,
    mediaType,
    posterPath,
    genres,
  });

  res.status(200).json(newSubtitle);
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

// delete subtitle
const deleteSubtitle = asyncHandler(async (req, res) => {
  const subtitle = await Subtitle.findById(req.params.id);

  if (!subtitle) {
    res.status(400);
    throw new Error("Subtitle not found");
  }

  // check for user
  // make sure the logged in user matches the goal user

  await subtitle.remove();

  res.status(200).json({ id: req.params.id });
});

// download sub
const downloadSubtitle = asyncHandler(async (req, res) => {
  const subtitle = await Subtitle.findById(req.params.id);
  res.set({
    "Content-Type": subtitle.mimetype,
  });
  res.sendFile(path.join(__dirname, "../public", subtitle.sublink));
});

module.exports = {
  getAllSubtitle,
  getSingleSubtitle,
  createSubtitle,
  updateSubtitle,
  deleteSubtitle,
  downloadSubtitle,
};
