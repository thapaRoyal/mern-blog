// imports
const User = require('../../models/user/User-model');

// register controller
const userRegisterController = async (req, res) => {
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
};

// exports
module.exports = { userRegisterController };
