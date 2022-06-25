const asyncHandler = require("express-async-handler");
const path = require("path");

const upload = asyncHandler(async (req, res, next) => {
  const { title, year } = req.body;
  const subtitle = req.files.subtitle;
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

module.exports = upload;
