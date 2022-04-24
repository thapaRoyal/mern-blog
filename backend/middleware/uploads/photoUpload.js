const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

// storage
const multerStorage = multer.memoryStorage();

// file type checking
const multerFilter = (req, file, cb) => {
  // check file type

  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      {
        message: 'File type is not supported',
      },
      false
    );
  }
};

const photoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1000000,
  },
}).single('image');

// image resizing
const profilePhotoResize = async (req, res, next) => {
  // check if there is no file
  if (!req.file) {
    next();
    return;
  }
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/profile/${req.file.filename}`));
  next();
};

// post image resizing
const postImageResize = async (req, res, next) => {
  // check if there is no file
  if (!req.file) {
    next();
    return;
  }
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/posts/${req.file.filename}`));
  next();
};

module.exports = { photoUpload, profilePhotoResize, postImageResize };
