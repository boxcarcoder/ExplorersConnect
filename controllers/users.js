const usersRouter = require('express').Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// @route   GET api/users
// @desc    Test route for users route
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
      let foundUser = await User.findOne({ email });
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

      let newUser = new User({
        name,
        email,
        avatar,
        password
      });

      //encrypt the password and register user into the db
      let salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();
    } catch (err) {
      res.status(500).json('Server error.');
    }

    res.json(req.body);
  }
);

module.exports = usersRouter;
