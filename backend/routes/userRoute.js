const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  profile,
  updateProfile,
  getAllUser,
  singleUser,
  followUser,
} = require("../controllers/userController");

const { isUser } = require("../middlewares/authMiddleware");
const avatarUpload = require("../middlewares/avatarMiddleware");
// delete all route from here
router.get("/all", getAllUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(isUser, profile)
  .put(isUser, avatarUpload, updateProfile);
router.get("/:id", singleUser);
router.put("/follow/:id", isUser, followUser);

module.exports = router;
