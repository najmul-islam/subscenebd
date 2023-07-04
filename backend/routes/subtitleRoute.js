const express = require("express");
const router = express.Router();
const {
  getAllSubtitle,
  getSingleSubtitle,
  createSubtitle,
  updateSubtitle,
  deleteSubtitle,
  downloadSubtitle,
} = require("../controllers/subtitleController");

const subtitleUpload = require("../middlewares/subtitleMiddleware");
const { isUser } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(getAllSubtitle)
  .post(isUser, subtitleUpload, createSubtitle);
router.get("/download/:id", downloadSubtitle);
router
  .route("/:id")
  .get(getSingleSubtitle)
  .put(isUser, updateSubtitle)
  .delete(isUser, deleteSubtitle);

module.exports = router;
