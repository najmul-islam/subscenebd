const asyncHandler = require("express-async-handler");
const fs = require("fs");
const User = require("../models/userModel");
const Subtitle = require("../models/subtitleModel");
const path = require("path");

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const nameExists = await User.findOne({ name });
  const emailExists = await User.findOne({ email });

  if (nameExists && emailExists) {
    res.status(400);
    throw new Error(
      `Name <b>${name}</b> and email <b>${email}</b> already taken`
    );
  }

  if (nameExists) {
    res.status(400);
    throw new Error(`Name <b>${name}</b> is already taken`);
  }
  if (emailExists) {
    res.status(400);
    throw new Error(`Email <b>${email}</b> is already taken`);
  }

  // create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: user.generateToken(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isValidPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: user.generateToken(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// profile
const profile = asyncHandler(async (req, res) => {
  res.status(200).json();
});

// update profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  const name = req.body.name;

  if (user.nameChanged) {
    return res.status(403).json({ message: "Name change already used" });
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { name: name, nameChanged: true },
    { new: true, useFindAndModify: false }
  ).select("-password");

  if (!updatedUser) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.status(200).json(updatedUser);
});

const updateAvatar = asyncHandler(async (req, res) => {
  const user = req.user;
  const avatar_link = req.avatar_link;

  // Remove the old avatar file if it exists
  if (user.avatar) {
    fs.unlinkSync(path.join(__dirname, "../public", user.avatar));
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { avatar: avatar_link },
    { new: true, useFindAndModify: false }
  ).select("-password");

  if (!updatedUser) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.status(200).json(updatedUser);
});

// get all user
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .populate(
      "subtitles",
      "_id title relase_date poster_path downloads createdAt"
    )
    .select("-password -role -email -nameChanged -downloads");
  res.status(200).json(users);
});

// get all user
const getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById({ _id: userId })
    .populate(
      "subtitles",
      "_id title relase_date poster_path downloads createdAt"
    )
    .select("-password -role -email -nameChanged -downloads");
  res.status(200).json(user);
});

const getSearchUser = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const userId = req.user._id;

  if (name !== "") {
    const users = await User.find({
      name: { $regex: name, $options: "i" },
    })
      .populate(
        "subtitles",
        "_id title relase_date poster_path downloads createdAt"
      )
      // .populate({
      //   path: "conversations",
      //   populate: { path: "participants", select: "_id name" },
      //   match: { participants: userId },
      // })
      .select("-password -role -email");

    res.status(200).json(users);

    // const response =[]

    // users.forEach((user) =>{
    //   if(user.conversations.length>0){

    //   }
    // })
  } else {
    res.status(200).json([]);
  }
});

// get single user
// const singleUser = asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   const user = await User.findById({ _id: id })
//     .populate({ path: "subtitles", options: { sort: { createdAt: -1 } } })
//     .select("-password -email -role");

//   if (!user) {
//     res.status(400);
//     throw new Error("There no user with this id");
//   }
//   res.status(200).json(user);
// });

// get user by search
// const searchUser = asyncHandler(async(req, res) => {
//   const
// })

// get user subtitle
const getUserSubtitles = asyncHandler(async (req, res) => {
  res.status(200).json("Experimental");
});

// get user downloads subtitles
const getUserDownloadsSubtitles = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const subtitlesIds = user.downloads;

  const downloadedSubtitles = await Subtitle.find({
    _id: { $in: subtitlesIds },
  });

  res.status(200).json(downloadedSubtitles);
});

const putUserDownloadsSubtitles = asyncHandler(async (req, res) => {
  const subtitleId = req.params.id;
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (userId && !user.downloads.includes(subtitleId)) {
    await user.updateOne({
      $push: { downloads: subtitleId },
    });
  }

  res.status(200).json(user);
});

// follow user
const followUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // add user follow
  if (!user.followers.includes(req.user._id)) {
    const updatedUser = await user.updateOne({
      $push: { followers: req.user._id },
    });

    res.status(200).json(updatedUser);
  } else {
    const updatedUser = await user.updateOne({
      $pull: { followers: req.user._id },
    });

    res.status(200).json(updatedUser);
  }
});

module.exports = {
  registerUser,
  loginUser,
  profile,
  updateProfile,
  updateAvatar,
  getUsers,
  getSingleUser,
  getSearchUser,
  followUser,
  getUserSubtitles,
  getUserDownloadsSubtitles,
  putUserDownloadsSubtitles,
};
