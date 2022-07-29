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

const subUpload = require("../middlewares/subtitleUploadMiddleware");
const protect = require("../middlewares/authMiddleware");

router.route("/").get(getAllSubtitle).post(protect, subUpload, createSubtitle);
router.get("/download/:id", downloadSubtitle);
router
  .route("/:id")
  .get(getSingleSubtitle)
  .put(protect, updateSubtitle)
  .delete(protect, deleteSubtitle);

module.exports = router;
