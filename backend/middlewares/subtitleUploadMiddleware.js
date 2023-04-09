const asyncHandler = require("express-async-handler");
const path = require("path");

const subtitleUpload = asyncHandler(async (req, res, next) => {
  const { title, year } = req.body;
  const subtitle = req.files.subtitle;
  // console.log(subtitle);
  if (!subtitle) {
    res.status(400);
    throw new Error("Please add a subtitle");
  }
  const subSize = subtitle.size;
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
  if (!year) {
    subName =
      title
        .toLowerCase()
        .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
        .join("-") +
      "-bengali" +
      "-" +
      Date.now() +
      path.extname(subtitle.name);
  }
  if (year) {
    subName =
      title
        .toLowerCase()
        .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
        .join("-") +
      "-" +
      year +
      "-bengali" +
      "-" +
      Date.now() +
      path.extname(subtitle.name);
  }

  // file path
  const subPath = path.join(
    __dirname,
    "../public",
    "uploads",
    "subtitles",
    subName
  );

  await subtitle.mv(subPath);
  req.sublink = `/uploads/subtitles/${subName}`;
  req.mimetype = subtitle.mimetype;
  next();
});

module.exports = subtitleUpload;
