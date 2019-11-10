const config = require('./utils/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log('database connected successfully.');
  })
  .catch(err => {
    console.error('error connecting to db:', err.message);
    process.exit(1);
  });

module.exports = app;
