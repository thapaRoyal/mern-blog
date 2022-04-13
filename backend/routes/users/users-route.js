// imports
const router = require('express').Router();
const {
  userRegisterController,
  loginUserController,
  fetchAllUsersController,
  deleteUserController,
  fetchUserDetailsController,
} = require('../../controllers/users/user-controller');

// register route
router.post('/api/users/register', userRegisterController);
router.post('/api/users/login', loginUserController);
router.get('/api/users', fetchAllUsersController);
router.delete('/api/users/:id', deleteUserController);
router.get('/api/users/:id', fetchUserDetailsController);

module.exports = router;
