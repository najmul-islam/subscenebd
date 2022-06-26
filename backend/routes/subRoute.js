const express = require("express");
const router = express.Router();
const {
  getAllSub,
  getSingleSub,
  createSub,
  downloadSub,
} = require("../controllers/subController");

const subUpload = require("../middlewares/subUploadMiddleware");

router.get("/", getAllSub);
router.post("/", subUpload, createSub);
router.get("/:id", getSingleSub);
router.get("/:id/download", downloadSub);

module.exports = router;
