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
  unBlockUserController,
  generateVerificationTokenController,
  accountVerificationController,
  forgetPasswordToken,
  passwordResetController,
  profilePhotoUploadController,
} = require('../../controllers/users/user-controller');
const authMiddleware = require('../../middleware/auth/authMiddleware');
const {
  profilePhotoUpload,
  profilePhotoResize,
} = require('../../middleware/uploads/profilePhotoUpload');

// register route
router.post('/api/users/register', userRegisterController);
router.post('/api/users/login', loginUserController);
router.put(
  '/api/users/profile/profile-photo-upload',
  authMiddleware,
  profilePhotoUpload,
  profilePhotoResize,
  profilePhotoUploadController
);

router.get('/api/users', authMiddleware, fetchAllUsersController);
router.put(
  '/api/users/profile/password',
  authMiddleware,
  updateUserPasswordController
);
router.post('/api/users/forget-password-token', forgetPasswordToken);
router.put('/api/users/reset-password', passwordResetController);
router.put(
  '/api/users/profile/follow',
  authMiddleware,
  followingUserController
);
router.post(
  '/api/users/generate-verify-email-token',
  authMiddleware,
  generateVerificationTokenController
);
router.put(
  '/api/users/verify-account',
  authMiddleware,
  accountVerificationController
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
router.put(
  '/api/users/profile/unblock-user/:id',
  authMiddleware,
  unBlockUserController
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
