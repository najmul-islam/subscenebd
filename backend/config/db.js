const mongoose = require("mongoose");

const connectDB = async (url) => {
  const conn = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected`.cyan.underline);
  return conn;
};

module.exports = connectDB;
