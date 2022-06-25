const mongoose = require("mongoose");

const subSchema = mongoose.Schema(
  {
    sub: {
      type: String,
    },
    title: {
      type: String,
    },
    year: {
      type: String,
    },
    releaseName: {
      type: String,
    },
    releaseType: {
      type: String,
      enum: [
        "Dont know",
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
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sub", subSchema);
