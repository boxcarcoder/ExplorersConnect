const usersRouter = require('express').Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

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
      let foundUser = await User.findOne({ email: email });
      if (foundUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User exists already.' }] });
      }
    } catch (err) {
      res.status(500).json('Server error.');
    }

    res.json(req.body);
  }
);

module.exports = usersRouter;
