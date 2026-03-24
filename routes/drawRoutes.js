const express = require("express");
const router = express.Router();
const { runDraw } = require("../controllers/drawController");

router.post("/run", runDraw);

module.exports = router;