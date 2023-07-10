const express = require("express");
const router = express.Router();
const {
  getAllSubtitle,
  getSingleSubtitle,
  createSubtitle,
  updateSubtitle,
  deleteSubtitle,
  likeSubtitle,
  dislikeSubtitle,
  downloadSubtitle,
  downloadSubtitleCount,
} = require("../controllers/subtitleController");

const subtitleUpload = require("../middlewares/subtitleMiddleware");
const { isUser } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(getAllSubtitle)
  .post(isUser, subtitleUpload, createSubtitle);
router.route("/download/:id").get(downloadSubtitle).put(downloadSubtitleCount);
router
  .route("/:id")
  .get(getSingleSubtitle)
  .put(isUser, updateSubtitle)
  .delete(isUser, deleteSubtitle);

router.route("/like/:id").put(isUser, likeSubtitle);
router.route("/dislike/:id").put(isUser, dislikeSubtitle);

module.exports = router;
