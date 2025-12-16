require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("MONGO_URI =", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI); // <-- no extra options
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
