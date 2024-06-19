const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
// console.log("MOngouri:", MONGO_URI);

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
