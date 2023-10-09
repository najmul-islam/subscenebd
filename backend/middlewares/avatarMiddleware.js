const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const avatarUpload = asyncHandler(async (req, res, next) => {
  const avatar = req.files.avatar;
  const user = req.user;
  console.log("avatar", avatar);
  if (!avatar) {
    res.status(400);
    throw new Error("Please add a avatar");
  }

  const extension = path.extname(avatar.name);

  // check file format
  const allowedExtensions = /^\.jpg|\.jpeg|\.png$/;
  if (!allowedExtensions.test(extension)) {
    res.status(400);
    throw new Error(
      `File format ${extension} not supported. Allowed formats are: jpg, png`
    );
  }

  // change name
  let avatarName;

  avatarName = user.name
    .toLowerCase()
    .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
    .join("-");

  try {
    const result = await cloudinary.uploader.upload(avatar.tempFilePath, {
      folder: "avatars",
      public_id: avatarName,
      quality: "auto",
    });

    if (result) {
      fs.unlink(avatar.tempFilePath, (error) => {
        if (error) console.log(error);
      });
    }
    req.avatar_link = result.secure_url;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = avatarUpload;
