const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4, // important for Mac
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("❌ DB ERROR:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;