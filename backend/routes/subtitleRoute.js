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
  commentSubtitle,
  downloadSubtitle,
  editCommentSubtitle,
  delteCommentSubtitle,
  // downloadSubtitleCount,
} = require("../controllers/subtitleController");

const subtitleUpload = require("../middlewares/subtitleMiddleware");
const { isUser } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(getAllSubtitle)
  .post(isUser, subtitleUpload, createSubtitle);
router.route("/download/:id").get(downloadSubtitle).put(downloadSubtitle);
router
  .route("/:id")
  .get(getSingleSubtitle)
  .put(isUser, updateSubtitle)
  .delete(isUser, deleteSubtitle);

// like & unlike
router.route("/like/:id").put(isUser, likeSubtitle);
router.route("/dislike/:id").put(isUser, dislikeSubtitle);

// comment
router.route("/comments/:id").put(isUser, commentSubtitle);
router
  .route("/comments/:id/:commentId")
  .put(isUser, editCommentSubtitle)
  .delete(isUser, delteCommentSubtitle);

module.exports = router;
