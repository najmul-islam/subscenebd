const mongoose = require("mongoose");

const subtitleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    releaseName: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
    mediaType: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    sublink: {
      type: String,
    },
    posterPath: {
      type: String,
    },
    genres: {
      type: Array,
    },
    releaseType: {
      type: String,
      enum: ["CAM", "DVD", "HDR", "TV", "WEB", "BR"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subtitle", subtitleSchema);
