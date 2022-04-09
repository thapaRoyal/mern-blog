// imports
const User = require('../../models/user/User-model');
const expressAsyncHandler = require('express-async-handler');

// register controller
const userRegisterController = expressAsyncHandler(async (req, res) => {
  // destructureRequestBody(req);
  const { firstName, lastName, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      error: 'User already exists',
    });
  }

  try {
    // Register user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.json(user);
  } catch (err) {
    res.json({ user: 'User registered' });
  }
});

// login controller
const loginUserController = expressAsyncHandler(async (req, res) => {
  // destructureRequestBody(req);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  res.json({ user: 'Login successful' });
});

// exports
module.exports = { userRegisterController, loginUserController };
