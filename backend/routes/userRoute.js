const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getSingleUser,
  getSearchUser,
  profile,
  updateProfile,
  updateAvatar,
  getUserDownloadsSubtitles,
  putUserDownloadsSubtitles,
  followUser,
} = require("../controllers/userController");

const { isUser } = require("../middlewares/authMiddleware");
const avatarUpload = require("../middlewares/avatarMiddleware");

// auth route
router.post("/register", registerUser);
router.post("/login", loginUser);

// user private route
router.route("/profile").get(isUser, profile).put(isUser, updateProfile);
router.route("/profile/avatar").put(isUser, avatarUpload, updateAvatar);

// count get and save user download subtitles
router.route("/downloads").get(isUser, getUserDownloadsSubtitles);
router.route("/downloads/:id").put(isUser, putUserDownloadsSubtitles);
router.put("/follow/:id", isUser, followUser);

// public route
router.get("/", getUsers);
router.get("/search", getSearchUser);
router.get("/:userId", getSingleUser);

module.exports = router;
