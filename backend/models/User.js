const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
    },
  ],

  userType: {
    type: String,
  },
  token: {
    type: String,
  },

  resetPasswordExpire: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
