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

const protect = require("../middlewares/authMiddleware");

router.get("/all", getAllUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, profile);
router.get("/:id", singleUser);
router.get("/:id/subtitles", singleUserSubtitle);

module.exports = router;
