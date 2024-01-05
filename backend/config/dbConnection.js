const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    console.log("Connecting to DB.......");
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
