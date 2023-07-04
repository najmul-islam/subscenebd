const mongoose = require("mongoose");

const subtitleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tmdbId: {
      type: Number,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    release_name: {
      type: Array,
    },
    release_type: {
      type: String,
      // enum: ["CAM", "DVD", "HDR", "TV", "WEB", "BR"],
    },
    release_date: {
      type: String,
    },
    // film/tv-series/short-film/music
    media_type: {
      type: String,
    },
    mime_type: {
      type: String,
    },
    subtitle_link: {
      type: String,
    },
    backdrop_path: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    genres: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subtitle", subtitleSchema);
