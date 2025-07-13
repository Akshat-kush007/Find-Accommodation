const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  map: {
    type: String,
    // required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Accommodation", accommodationSchema);
