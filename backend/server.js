// imports
require('dotenv').config();
const express = require('express');
const DbConnect = require('./config/DB/dbConnect');

// server
const app = express();

// DB
DbConnect();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
