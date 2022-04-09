// imports
const express = require('express');
const {
  userRegisterController,
} = require('../../controllers/users/user-controller');

// init
const userRoutes = express.Router();

// register route
userRoutes.post('/api/users/register', userRegisterController);

module.exports = userRoutes;
