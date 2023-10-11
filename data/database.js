require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(URI, options);
  return mongoose.connection;
};

module.exports = connectDB;
