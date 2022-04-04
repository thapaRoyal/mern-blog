const mongoose = require('mongoose');

const DbConnect = async () => {
  //   const DB_URL = process.env.DB_URL;
  // const DB_LOCAL = process.env.DB_LOCAL;
  try {
    await mongoose.connect('mongodb://localhost:27017/blogMern', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.log(`Error in connecting to database: ${err.message}`);
  }
};

module.exports = DbConnect;
