const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const authRouter = require('./controllers/auth');
const profilesRouter = require('./controllers/profiles');
const postsRouter = require('./controllers/posts');
const bodyParser = require('body-parser');
const path = require('path');

// initialize app with Express
const app = express();

// connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('database connected successfully.');
  } catch (err) {
    console.log('failed to connect to db: ', err.message);
    process.exit(1);
  }
};
connectDB();

app.use(bodyParser.json());

// Define routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/posts', postsRouter);

// Server static assets in production since in production, we are no longer using the React dev server.
if (process.env.NODE_ENV === 'production') {
  // Set the static folder using express with client/build, which is created after
  // building the production build from the package.json script.
  app.use(express.static('client/build'));

  // Serve the static HTML file created from building a production build of the client.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
