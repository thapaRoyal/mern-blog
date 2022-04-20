const multer = require('multer');

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

const profilePhotoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1000000,
  },
}).single('image');

module.exports = { profilePhotoUpload };
