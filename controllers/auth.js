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
authRouter.post(
  '/',
  [
    check('email', 'Please enter a valid email.').isEmail(),
    check('password', 'Password is required.').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //check if user exists already.
      let foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      //after the user is registered, return a token for authentication
      let payload = {
        user: {
          id: newUser.id
        }
      };
      jwt.sign(
        payload,
        config.JWTSECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).json('Server error.');
    }
  }
);

module.exports = authRouter;
