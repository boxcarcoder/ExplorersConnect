const usersRouter = require('express').Router();

// @route   GET api/users
// @desc    Test route for users route
// @access  Public
usersRouter.get('/', (req, res) => {
  res.json('user route.');
});

module.exports = usersRouter;
