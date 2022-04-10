// imports
const User = require('../../models/user/User-model');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../config/token/generateToken');

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
  // Check if user exists
  const userFound = await User.findOne({ email });
  //  check if password is matched
  if (userFound && (await userFound.isPasswordMatched(password))) {
    return res.json({
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      profilePhoto: userFound.profilePhoto,
      isAdmin: userFound.isAdmin,
      token: generateToken(userFound._id),
    });
  }
  res.status(400).json({
    error: 'User not found',
  });
});

// exports
module.exports = { userRegisterController, loginUserController };
