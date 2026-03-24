const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const scoreController = require("../controllers/scoreController");

// DEBUG (temporary)
console.log("protect:", typeof protect);
console.log("addScore:", typeof scoreController.addScore);
console.log("getScores:", typeof scoreController.getScores);

router.post("/", protect, scoreController.addScore);
router.get("/", protect, scoreController.getScores);

module.exports = router;