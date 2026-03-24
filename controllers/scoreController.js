const Score = require("../models/Score");

// ADD SCORE
exports.addScore = async (req, res) => {
  try {
    const { score, date } = req.body;

    // Get existing scores (oldest first)
    const scores = await Score.find({ user: req.user.id }).sort({ createdAt: 1 });

    // If already 5 → delete oldest
    if (scores.length >= 5) {
      await Score.findByIdAndDelete(scores[0]._id);
    }

    const newScore = await Score.create({
      user: req.user.id,
      score,
      date,
    });

    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SCORES
exports.getScores = async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};