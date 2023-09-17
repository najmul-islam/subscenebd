const asyncHandler = require("express-async-handler");
const path = require("path");

const avatarUpload = asyncHandler(async (req, res, next) => {
  const avatar = req.files.avatar;
  const user = req.user;

  if (!avatar) {
    res.status(400);
    throw new Error("Please add a avatar");
  }

  const extension = path.extname(avatar.name);

  // check file format
  const allowedExtensions = /jpg|png/;
  if (!allowedExtensions.test(extension)) {
    res.status(400);
    throw new Error(
      `File format ${extension} not supported. Allowed formats are: jpg, png`
    );
  }

  // change name
  let avatarName;

  avatarName =
    user.name
      .toLowerCase()
      .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
      .join("-") +
    "-" +
    Date.now() +
    path.extname(avatar.name);

  // file path
  const avatarPath = path.join(
    __dirname,
    "../public",
    "uploads",
    "avatar",
    avatarName
  );

  await avatar.mv(avatarPath);
  req.avatar_link = `/uploads/avatar/${avatarName}`;
  next();
});

module.exports = avatarUpload;
