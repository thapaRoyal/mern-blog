const express = require('express');
const {
  sendEmailMessageController,
} = require('../../controllers/emailMessage/email-message-controller');
const authMiddleware = require('../../middleware/auth/authMiddleware');
const emailMessageRoute = express.Router();
emailMessageRoute.post(
  '/api/email',
  authMiddleware,
  sendEmailMessageController
);

module.exports = emailMessageRoute;
