const asyncHandler = require("express-async-handler");
const path = require("path");
const cloudinary = require("../config/cloudinary");

const subtitleUpload = asyncHandler(async (req, res, next) => {
  const { subtitle_name } = req.body;
  const subtitle = req.files.subtitle;

  if (!subtitle) {
    res.status(400);
    throw new Error("Please add a subtitle");
  }

  // get size
  const subSize = subtitle.size;
  // get ext
  const extension = path.extname(subtitle.name);

  // check file format
  const allowedExtensions = /zip|srt|style|sub|txt|ssa|ass|smi/;
  if (!allowedExtensions.test(extension)) {
    res.status(400);
    throw new Error(
      `File format ${extension} not supported. Allowed formats are: txt, smi, srt, ssa, sub, ass, style.`
    );
  }

  // check size
  if (subSize > 1024 * 512) {
    res.status(400);
    throw new Error("File size error. file to big");
  }

  // change name
  let subName;
  subName =
    subtitle_name
      .toLowerCase()
      .replace(/[.:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/g, "")
      .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
      .join("-") +
    "-bengali" +
    "-" +
    Date.now() +
    path.extname(subtitle.name);

  try {
    const result = await cloudinary.uploader.upload(subtitle.tempFilePath, {
      folder: "subtitles",
      public_id: subName,
      resource_type: "raw",
    });
    req.mime_type = subtitle.mimetype;
    req.subtitle_link = result.secure_url;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
  next();
});

module.exports = subtitleUpload;
