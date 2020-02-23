const usersRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const user = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

// @route   POST api/users
// @desc    Route to register a user.
// @access  Public
usersRouter.post(
  '/',
  [
    check('name', 'Please enter a name.')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email.').isEmail(),
    check(
      'password',
      'Please enter a password of 6 characters or more.'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //check if user exists already.
      let foundUser = await user.findOne({ email });
      if (foundUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User exists already.' }] });
      }

      //if user doesn't exist, create a new user
      let avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mp'
      });

      let newUser = new user({
        name,
        email,
        avatar,
        password
      });

      //encrypt the password and register user into the db
      let salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

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

module.exports = usersRouter;
