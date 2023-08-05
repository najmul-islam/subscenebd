const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  profile,
  updateProfile,
  updateAvatar,
  getUsers,
  getSingleUser,
  getUserSubtitles,
  getUserDownloadsSubtitles,
  putUserDownloadsSubtitles,
  followUser,
  getSearchUser,
} = require("../controllers/userController");

const { isUser } = require("../middlewares/authMiddleware");
const avatarUpload = require("../middlewares/avatarMiddleware");
// delete all route from here
router.get("/", getUsers);
router.get("/:userId", getSingleUser);
router.get("/search", getSearchUser);

// auth route
router.post("/register", registerUser);
router.post("/login", loginUser);

// user private route
router.route("/profile").get(isUser, profile).put(isUser, updateProfile);
router.route("/profile/avatar").put(isUser, avatarUpload, updateAvatar);

router.route("/subtitles").get(isUser, getUserSubtitles);

// count get and save user download subtitles
router.route("/downloads").get(isUser, getUserDownloadsSubtitles);
router.route("/downloads/:id").put(isUser, putUserDownloadsSubtitles);

// user public route
// router.get("/:id", singleUser);
router.put("/follow/:id", isUser, followUser);

module.exports = router;
