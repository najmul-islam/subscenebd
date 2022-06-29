const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  profile,
  getAllUser,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");

router.get("/all", getAllUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, profile);

module.exports = router;
