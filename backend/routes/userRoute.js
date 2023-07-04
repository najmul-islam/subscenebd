const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  profile,
  getAllUser,
  singleUser,
  singleUserSubtitle,
} = require("../controllers/userController");

const { isUser } = require("../middlewares/authMiddleware");

// delete all route from here
router.get("/all", getAllUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isUser, profile);
router.get("/:id", singleUser);
router.get("/:id/subtitles", singleUserSubtitle);

module.exports = router;
