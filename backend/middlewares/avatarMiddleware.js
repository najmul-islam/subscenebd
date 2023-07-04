const asyncHandler = require("express-async-handler");
const path = require("path");

const avatarUpload = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const avatar = req.files.avatar;
  if (!avatar) {
    res.status(400);
    throw new Error("Please add a avatar");
  }
  const avatarSize = avatar.size;
  const extension = path.extname(avatar.name);

  // check file format
  const allowedExtensions = /jpg|png/;
  if (!allowedExtensions.test(extension)) {
    res.status(400);
    throw new Error(
      `File format ${extension} not supported. Allowed formats are: jpg, png`
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
  req.subPath = subPath;
  next();
});

module.exports = avatarUpload;
