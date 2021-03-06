// imports
require('dotenv').config();
const express = require('express');
const DbConnect = require('./config/DB/dbConnect');
const bodyParser = require('body-parser');
const { errorHandler, notFound } = require('./middleware/error/errorHandler');
const userRoute = require('./routes/users/users-route');
const postRoute = require('./routes/posts/posts-route');
const commentRoute = require('./routes/comments/comments-route');
const emailMessageRoute = require('./routes/emailMessage/email-message-route');
const categoryRoute = require('./routes/category/category-route');
const cors = require('cors');

// server
const app = express();

// DB
DbConnect();

// middleware
app.use(bodyParser.json());
app.use(cors());

// routes
app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);
app.use(emailMessageRoute);
app.use(categoryRoute);

// middleware || error handler
app.use(notFound);
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 8000;

// Listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
