const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 45,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } // ✅ ADD THIS
);

module.exports = mongoose.model("Score", scoreSchema);