const asyncHanlder = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// check user
const isUser = asyncHanlder(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get form the token
      req.user = await User.findById(decoded._id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// check moderator
const isModerator = asyncHanlder(async (req, res, next) => {
  if (req.user.role === "moderator") {
    return next();
  } else {
    res.status(401);
    throw new Error("you do not have the permission to perform this action");
  }
});

// check admin
const isAdmin = asyncHanlder(async (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  } else {
    res.status(401);
    throw new Error("you do not have the permission to perform this action");
  }
});

module.exports = { isUser, isModerator, isAdmin };
