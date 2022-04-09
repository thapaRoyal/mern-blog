// imports
require('dotenv').config();
const express = require('express');
const DbConnect = require('./config/DB/dbConnect');
const bodyParser = require('body-parser');
const router = require('./routes/users/users-route');
const { errorHandler } = require('./middleware/error/errorHandler');

// server
const app = express();

// DB
DbConnect();

// middleware
app.use(bodyParser.json());

// routes
app.use(router);

// middleware || error handler
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 8000;

// Listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
