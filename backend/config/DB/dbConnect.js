// imports
const mongoose = require('mongoose');

// DB connection
const DbConnect = async () => {
  const DB_URL = process.env.DB_URL;
  const DB_LOCAL = process.env.DB_LOCAL;
  try {
    await mongoose.connect(DB_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.log(`Error in connecting to database: ${err.message}`);
  }
};

// Exports
module.exports = DbConnect;
