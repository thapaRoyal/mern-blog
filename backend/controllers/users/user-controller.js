// imports
const User = require('../../models/user/User-model');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../config/token/generateToken');
const validateMongoId = require('../../utils/validateMongoId');

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
      _id: userFound._id,
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

// fetch all users
const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.json({ error: 'Error fetching users' });
  }
});

// delete user
const deleteUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // if user id is valid
  validateMongoId(id);
  // delete
  if (!id) throw new Error('No id provided');
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (err) {
    res.json(err);
  }
});

// user details
const fetchUserDetailsController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // if user id is valid
  validateMongoId(id);

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// user profile
const userProfileController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // if user id is valid

  try {
    const myProfile = await User.findById(id);
    res.json(myProfile);
  } catch (err) {
    res.json(err);
  }
});

// update user profile
const updateUserProfileController = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  // if user id is valid
  validateMongoId(_id);

  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      bio: req.body.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

// update password
const updateUserPasswordController = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoId(_id);
  //Find the user by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

// following
const followingUserController = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;

  // find the target user and check if login user id exists
  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers.find(
    (user) => user.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error('Already following');

  // 1. find the user you want to follow and update its followers field
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    {
      new: true,
    }
  );

  // 2. Update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    {
      new: true,
    }
  );

  res.json('You have successfully followed the user');
});

// unfollow

const unfollowUserController = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  // find the user you want to unfollow and check if login user id exists
  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    {
      new: true,
    }
  );

  // update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    {
      new: true,
    }
  );

  res.json('You have successfully unfollowed the user');
});

// Block user
const blockUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    }
  );
  res.json(user);
});

// exports
module.exports = {
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
};
