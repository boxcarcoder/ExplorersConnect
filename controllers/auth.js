const authRouter = require('express').Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');

// @route   GET api/auth
// @desc    Protected route to access a user's profile.
// @access  Public
authRouter.get('/', auth, async (req, res) => {
  //an HTTP request to this protected route must be decoded by the auth middleware.
  try {
    let user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json('Server error.');
  }
});

// @route   POST api/auth
// @desc    Protected route to log a user in.
// @access  Public
authRouter.post('/', auth, (req, res) => {});

module.exports = authRouter;
