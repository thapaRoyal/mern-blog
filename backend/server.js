// imports
require('dotenv').config();
const express = require('express');
const DbConnect = require('./config/DB/dbConnect');
const {
  userRegisterController,
} = require('./controllers/users/user-controller');
const bodyParser = require('body-parser');

// server
const app = express();

// DB
DbConnect();

// middleware
app.use(bodyParser.json());

// Register route (post request))
app.post('/api/users/register', userRegisterController);

// Login route (post request))
app.post('/api/users/login', (req, res) => {
  // business logic
  res.json({ user: 'Login successful' });
});

// fetch all users route (get request))
app.get('/api/users', (req, res) => {
  // business logic
  res.json({ user: 'All users fetched' });
});

// PORT
const PORT = process.env.PORT || 8000;

// Listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
