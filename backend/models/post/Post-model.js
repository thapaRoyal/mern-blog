const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: string,
      required: [true, 'Post title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Post category is required'],
      default: 'All',
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisLiked: {
      type: Boolean,
      default: false,
    },
    numberOfViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post Author is required'],
    },
    description: {
      type: String,
      required: [true, 'Post description is required'],
    },
    image: {
      type: String,
      default:
        'https://enviragallery.com/wp-content/uploads/2016/05/Set-Default-Featured-Image.jpg',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

// compile
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
