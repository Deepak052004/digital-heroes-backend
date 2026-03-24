const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  console.log("Root route hit");
  res.send("API Running...");
});

// Auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Score routes
const scoreRoutes = require("./routes/scoreRoutes");
app.use("/api/scores", scoreRoutes);

const drawRoutes = require("./routes/drawRoutes");

app.use("/api/draw", drawRoutes);
const PORT = process.env.PORT || 5001;

// Connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});