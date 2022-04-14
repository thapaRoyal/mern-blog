// imports
const router = require('express').Router();
const {
  userRegisterController,
  loginUserController,
  fetchAllUsersController,
  deleteUserController,
  fetchUserDetailsController,
  userProfileController,
  updateUserProfileController,
  updateUserPasswordController,
} = require('../../controllers/users/user-controller');
const authMiddleware = require('../../middleware/auth/authMiddleware');

// register route
router.post('/api/users/register', userRegisterController);
router.post('/api/users/login', loginUserController);
router.get('/api/users', authMiddleware, fetchAllUsersController);
router.delete('/api/users/:id', deleteUserController);
router.get('/api/users/:id', fetchUserDetailsController);
router.get('/api/users/profile/:id', authMiddleware, userProfileController);
router.put('/api/users/profile', authMiddleware, updateUserProfileController);
router.put(
  '/api/users/profile/password',
  authMiddleware,
  updateUserPasswordController
);

module.exports = router;
