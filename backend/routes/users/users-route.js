// imports
const router = require('express').Router();
const {
  userRegisterController,
  loginUserController,
} = require('../../controllers/users/user-controller');

// register route
router.post('/api/users/register', userRegisterController);
router.post('/api/users/login', loginUserController);

module.exports = router;
