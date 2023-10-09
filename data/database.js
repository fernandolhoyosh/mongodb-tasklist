require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGO_LOCAL;

const connectDB = async () => {

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

    /* try { */
      await mongoose.connect(URI, options);
      console.log('Connected database')
      return mongoose.connection;
    /* } catch (error) {
      console.error('Error connecting to database:', error);
    } */
  };
  
  module.exports = connectDB;