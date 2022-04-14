const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../models/user/User-model');

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // find user by id
        const user = await User.findById(decoded.id).select('-password');
        // attach the user to request object
        req.user = user;
        next();
      } else {
        res.status(401).json({
          message: 'Unauthorized',
        });
      }
    } catch (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
  } else {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
});

module.exports = authMiddleware;
