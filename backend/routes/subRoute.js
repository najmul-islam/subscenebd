const express = require("express");
const router = express.Router();
const {
  getAllSub,
  getSingleSub,
  createSub,
} = require("../controllers/subController");

const upload = require("../middlewares/subUploadMiddleware");

router.get("/", getAllSub);
router.get("/:id", getSingleSub);
router.post("/", upload, createSub);

module.exports = router;
