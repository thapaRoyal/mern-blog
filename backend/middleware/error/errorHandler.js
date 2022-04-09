// not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// error handler
const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
};

// exports
module.exports = { errorHandler, notFound };
