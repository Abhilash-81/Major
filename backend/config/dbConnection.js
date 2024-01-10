const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    console.log("Connecting to DB.......");
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
