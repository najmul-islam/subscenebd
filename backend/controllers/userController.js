const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Subtitle = require("../models/subtitleModel");

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
  res.status(200).json(req.user);
});

// update profile
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const avatar_link = req.avatar_link;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatar: avatar_link },
    { new: true, useFindAndModify: false }
  );

  if (!updatedUser) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.status(200).json(updatedUser);
});

// get all user
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate("subtitles");
  res.status(200).json({ nbHits: users.length, users });
});

// get single user
const singleUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id })
    .populate({ path: "subtitles", options: { sort: { createdAt: -1 } } })
    .select("-password -email -role");

  if (!user) {
    res.status(400);
    throw new Error("There no user with this id");
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
  getAllUser,
  singleUser,
  followUser,
};
