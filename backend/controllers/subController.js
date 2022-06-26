const path = require("path");
const asyncHandler = require("express-async-handler");
const Sub = require("../models/subModel");

// get all sub
const getAllSub = asyncHandler(async (req, res) => {
  const subs = await Sub.find({});

  res.status(200).json(subs);
});

// get sigle sub
const getSingleSub = asyncHandler(async (req, res) => {
  const id = req.params;

  const sub = await Sub.findById({ id });

  res.status(200).json(sub);
});

// create sub
const createSub = asyncHandler(async (req, res) => {
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

  const newSub = await Sub.create({
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

  res.status(200).json(newSub);
});

const downloadSub = asyncHandler(async (req, res) => {
  const subtitle = await Sub.findById(req.params.id);
  res.set({
    "Content-Type": subtitle.mimetype,
  });
  res.sendFile(path.join(__dirname, "../public", subtitle.sublink));
});

module.exports = {
  getAllSub,
  getSingleSub,
  createSub,
  downloadSub,
};
