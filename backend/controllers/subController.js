const path = require("path");
const asyncHandler = require("express-async-handler");
const genSubname = require("../helpers/genSubname");
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
  const { title, year, releaseName, releaseType, about } = req.body;
  const subPath = req.subPath;
  console.log(subPath);
  res.status(200).json();
});

module.exports = {
  getAllSub,
  getSingleSub,
  createSub,
};
