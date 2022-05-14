const expressAsyncHandler = require('express-async-handler');
const nodeMailer = require('nodemailer');
const EmailMessage = require('../../models/emailMessaging/email-messaging');

// NODEMAILER
let transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmailMessageController = expressAsyncHandler(async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    let mailOptions = {
      from: `${process.env.EMAIL_USER}`,
      to,
      subject,
      html: message,
    };

    // send mail
    await transporter.sendMail(mailOptions, (error, success) => {
      if (success) {
        res.json('mail sent');
      } else {
        console.log(error);
      }
    });
    await EmailMessage.create({
      sentBy: req.user._id,
      from: req.user.email,
      to,
      subject,
      message,
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = { sendEmailMessageController };
