// imports
const router = require('express').Router();
const {
  userRegisterController,
} = require('../../controllers/users/user-controller');

// register route
router.post('/api/users/register', userRegisterController);

module.exports = router;
