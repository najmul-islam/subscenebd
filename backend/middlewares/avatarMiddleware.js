const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const { error } = require("console");

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
    // const fileBuffer = Buffer.from(avatar.data);
    // const result = await new Promise((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream(
    //       {
    //         folder: "avatars",
    //         public_id: avatarName,
    //       },
    //       (error, result) => {
    //         if (error) {
    //           reject(error);
    //         } else {
    //           resolve(result);
    //         }
    //       }
    //     )
    //     .end(fileBuffer);
    // });
    const result = await cloudinary.uploader.upload(avatar.tempFilePath, {
      folder: "avatars",
      public_id: avatarName,
    });
    console.log("result", result);
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
