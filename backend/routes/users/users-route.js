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
  followingUserController,
  unfollowUserController,
  blockUserController,
} = require('../../controllers/users/user-controller');
const authMiddleware = require('../../middleware/auth/authMiddleware');

// register route
router.post('/api/users/register', userRegisterController);
router.post('/api/users/login', loginUserController);
router.get('/api/users', authMiddleware, fetchAllUsersController);
router.put(
  '/api/users/profile/password',
  authMiddleware,
  updateUserPasswordController
);
router.put(
  '/api/users/profile/follow',
  authMiddleware,
  followingUserController
);
router.put(
  '/api/users/profile/unfollow',
  authMiddleware,
  unfollowUserController
);
router.put(
  '/api/users/profile/block-user/:id',
  authMiddleware,
  blockUserController
);
router.get('/api/users/profile/:id', authMiddleware, userProfileController);
router.put(
  '/api/users/profile/:id',
  authMiddleware,
  updateUserProfileController
);
router.delete('/api/users/:id', deleteUserController);
router.get('/api/users/:id', fetchUserDetailsController);

module.exports = router;
