const mongoose = require("mongoose");

const subSchema = mongoose.Schema(
  {
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
      enum: [
        "Don't know",
        "Cam",
        "Telesync",
        "DVD",
        "BluRay",
        "TV",
        "Web",
        "Other",
      ],
      default: "Dont know",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sub", subSchema);
