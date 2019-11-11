const postsRouter = require('express').Router();

// @route   GET api/posts
// @desc    Test route for posts route
// @access  Public
postsRouter.get('/', (req, res) => {
  res.json('posts route.');
});

module.exports = postsRouter;
