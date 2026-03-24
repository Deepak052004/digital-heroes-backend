const Draw = require("../models/Draw");
const Score = require("../models/Score");

// Generate 5 unique random numbers (1–45)
const generateNumbers = () => {
  const numbers = new Set();

  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  return Array.from(numbers);
};

// RUN DRAW
exports.runDraw = async (req, res) => {
  try {
    // 1. Generate draw numbers
    const numbers = generateNumbers();

    // 2. Save draw
    const draw = await Draw.create({ numbers });

    // 3. Get unique users
    const users = await Score.distinct("user");

    let results = [];

    // 4. Check matches for each user
    for (let userId of users) {
      const userScores = await Score.find({ user: userId });

      const userNumbers = userScores.map((s) => Number(s.score));
      const matchCount = userNumbers.reduce((count, num) => {
  if (numbers.includes(Number(num))) {
    return count + 1;
  }
  return count;
}, 0);

      // 5. Only include if 3 or more matches
      if (matchCount >= 3) {
        results.push({
          user: userId,
          matches: matchCount,
        });
      }
    }

    // 6. Send response
    res.json({
      drawNumbers: numbers,
      winners: results,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};