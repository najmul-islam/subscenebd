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

router.route("/").get(getAllSubtitle).post(subUpload, createSubtitle);
router.get("/download/:id", downloadSubtitle);
router
  .route("/:id")
  .get(getSingleSubtitle)
  .put(updateSubtitle)
  .delete(deleteSubtitle);

module.exports = router;
