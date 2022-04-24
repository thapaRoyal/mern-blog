// imports
const userRoute = require('express').Router();
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
  photoUpload,
  profilePhotoResize,
} = require('../../middleware/uploads/photoUpload');

// register route
userRoute.post('/api/users/register', userRegisterController);
userRoute.post('/api/users/login', loginUserController);
userRoute.put(
  '/api/users/profile/profile-photo-upload',
  authMiddleware,
  photoUpload,
  profilePhotoResize,
  profilePhotoUploadController
);

userRoute.get('/api/users', authMiddleware, fetchAllUsersController);
userRoute.put(
  '/api/users/profile/password',
  authMiddleware,
  updateUserPasswordController
);
userRoute.post('/api/users/forget-password-token', forgetPasswordToken);
userRoute.put('/api/users/reset-password', passwordResetController);
userRoute.put(
  '/api/users/profile/follow',
  authMiddleware,
  followingUserController
);
userRoute.post(
  '/api/users/generate-verify-email-token',
  authMiddleware,
  generateVerificationTokenController
);
userRoute.put(
  '/api/users/verify-account',
  authMiddleware,
  accountVerificationController
);
userRoute.put(
  '/api/users/profile/unfollow',
  authMiddleware,
  unfollowUserController
);
userRoute.put(
  '/api/users/profile/block-user/:id',
  authMiddleware,
  blockUserController
);
userRoute.put(
  '/api/users/profile/unblock-user/:id',
  authMiddleware,
  unBlockUserController
);
userRoute.get('/api/users/profile/:id', authMiddleware, userProfileController);
userRoute.put(
  '/api/users/profile/:id',
  authMiddleware,
  updateUserProfileController
);
userRoute.delete('/api/users/:id', deleteUserController);
userRoute.get('/api/users/:id', fetchUserDetailsController);

module.exports = userRoute;
