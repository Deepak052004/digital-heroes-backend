const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema(
  {
    numbers: [Number], // 5 random numbers
  },
  { timestamps: true }
);

module.exports = mongoose.model("Draw", drawSchema);