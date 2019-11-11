const config = require('./utils/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const authRouter = require('./controllers/auth');
const profilesRouter = require('./controllers/profiles');
const postsRouter = require('./controllers/posts');

// mongoose
//   .connect(config.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(result => {
//     console.log('database connected successfully.');
//   })
//   .catch(err => {
//     console.error('error connecting to db:', err.message);
//     process.exit(1);
//   });

// connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('database connected successfully.');
  } catch (err) {
    console.log('failed to connect to db: ', err.message);
    process.exit(1);
  }
};
connectDB();

// Define routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/posts', postsRouter);

module.exports = app;
