const mongoose = require('mongoose');

const validateMongoId = (_id) => {
  const isValid = mongoose.Types.ObjectId.isValid(_id);
  if (!isValid) {
    throw new Error('Invalid id');
  }
};

module.exports = validateMongoId;
