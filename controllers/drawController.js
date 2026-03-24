exports.runDraw = async (req, res) => {
  try {
    // 🔥 1. Get all user scores
    const allScores = await Score.find();

    // Extract all numbers users picked
    let pool = allScores.map((s) => s.score);

    // 🔥 2. Add random numbers to maintain randomness
    while (pool.length < 20) {
      pool.push(Math.floor(Math.random() * 45) + 1);
    }

    // 🔥 3. Shuffle and pick 5 unique numbers
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const numbers = [...new Set(shuffled)].slice(0, 5);

    // Save draw
    const draw = await Draw.create({ numbers });

    // 🔥 4. Get unique users
    const users = [...new Set(allScores.map((s) => s.user.toString()))];

    let results = [];

    // 🔥 5. Check matches for each user
    for (let userId of users) {
      const userScores = allScores
        .filter((s) => s.user.toString() === userId)
        .map((s) => s.score);

      const matchCount = userScores.filter((num) =>
        numbers.includes(num)
      ).length;

      // ✅ CHANGED CONDITION HERE
      if (matchCount >= 2) {
        results.push({
          user: userId,
          matches: matchCount,
        });
      }
    }

    // 🔥 6. Safety: ensure at least 1 winner
    if (results.length === 0 && users.length > 0) {
      results.push({
        user: users[0],
        matches: 2,
      });
    }

    // 🔥 7. Response
    res.json({
      drawNumbers: numbers,
      winners: results,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};