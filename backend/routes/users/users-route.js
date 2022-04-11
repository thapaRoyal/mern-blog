// imports
const router = require('express').Router();
const {
  userRegisterController,
  loginUserController,
  fetchAllUsersController,
} = require('../../controllers/users/user-controller');

// register route
router.post('/api/users/register', userRegisterController);
router.post('/api/users/login', loginUserController);
router.get('/api/users', fetchAllUsersController);

module.exports = router;
