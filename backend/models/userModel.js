const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    nameChanged: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "user"],
      default: "user",
    },
    avatar: { type: String },
    followers: { type: Array, default: [] },
    downloads: { type: Array, default: [] },
    notifications: [
      {
        type: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    subtitles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subtitle",
      },
    ],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hanshedPassword = await bcrypt.hash(this.password, salt);
      this.password = hanshedPassword;

      if (this.email === process.env.ADMIN_EMAIL) {
        this.role = "admin";
      }
      next();
    }
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = mongoose.model("User", userSchema);
