const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
      enum: [
        "likeSubtitle",
        "dislikeSubtitle",
        "commentSubtitle",
        "likePost",
        "commentPost",
      ],
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    subtitle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtitle",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
