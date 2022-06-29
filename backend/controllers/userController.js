const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const genToken = require("../helpers/genToken");
const User = require("../models/userModel");

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

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
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

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
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

// get all user
const getAllUser = asyncHandler(async (req, res) => {
  const Users = await User.find({});
  res.status(200).json(Users);
});

module.exports = {
  registerUser,
  loginUser,
  profile,
  getAllUser,
};
