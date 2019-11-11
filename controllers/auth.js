const authRouter = require('express').Router();

// @route   GET api/auth
// @desc    Test route for auth route
// @access  Public
authRouter.get('/', (req, res) => {
  res.json('auth route.');
});

module.exports = authRouter;
