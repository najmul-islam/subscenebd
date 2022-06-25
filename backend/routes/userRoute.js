const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  profile,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, profile);

module.exports = router;
