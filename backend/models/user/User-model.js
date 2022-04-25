// import
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Create Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      required: [true, 'First name is required'],
      type: String,
    },

    lastName: {
      required: [true, 'Last name is required'],
      type: String,
    },

    profilePhoto: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    },

    email: {
      required: [true, 'Email is required'],
      type: String,
    },

    bio: {
      type: String,
    },

    password: {
      required: [true, 'Password is required'],
      type: String,
    },

    postCount: {
      type: Number,
      default: 0,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ['Guest', 'Admin', 'Blogger'],
    },

    isFollowing: {
      type: Boolean,
      default: false,
    },

    isUnFollowing: {
      type: Boolean,
      default: false,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    accountVerificationToken: {
      type: String,
    },

    accountVerificationTokenExpiry: {
      type: Date,
    },
    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },

    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },

    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },

    passwordChangeAt: {
      type: Date,
    },

    passwordResetToken: {
      type: String,
    },

    passwordResetTokenExpiry: {
      type: Date,
    },

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// virtual method to populate created post
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

// hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// verify account
userSchema.methods.createAccountVerificationToken = async function () {
  // create token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  this.accountVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  this.accountVerificationTokenExpiry = Date.now() + 30 * 60 * 1000;
  return verificationToken;
};

// password reset/forget password
userSchema.methods.createPasswordResetToken = async function () {
  // create token
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetTokenExpiry = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

// Compile model from schema
const User = mongoose.model('User', userSchema);

// exports
module.exports = User;
