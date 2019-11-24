const postsRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');

const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private since only a logged in user can make a post
postsRouter.post(
  '/',
  [
    auth,
    [
      check('text', 'Please enter text for the post.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      // retrieve the logged in user from the db
      let user = await User.findById(req.user.id).select('-password');

      // create new post
      let newPost = new Post({
        text: req.body.text, //get the post text from the req
        name: user.name, //get the name and avatar of the logged in user from the db
        avatar: user.avatar,
        user: req.user.id // get the user ID from the token of the logged in user
      });

      let post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error.');
    }
  }
);

module.exports = postsRouter;
