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

// @route   GET api/posts
// @desc    Fetch all posts
// @access  Public so site visitors can see posts for more exposure
postsRouter.get('/', async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 }); //sort posts by most recent

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error.');
  }
});

// @route   GET api/posts/:postID
// @desc    Fetch post by ID
// @access  Public so site visitors can see posts for more exposure
postsRouter.get('/:postID', async (req, res) => {
  try {
    let post = await Post.findById(req.params.postID); //sort posts by most recent

    if (!post) return res.status(400).json('This post could not be found.');

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      //a properly formatted ID was not found in the request
      return res.status(400).status('This post could not be found.');
    }
    res.status(500).json('Server Error.');
  }
});

// @route   DELETE api/posts/:postID
// @desc    Delete post by ID
// @access  Private since only a logged in user can delete their post
postsRouter.delete('/:postID', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postID);

    if (!post) return res.status(400).json('This post could not be found.');

    // check if user is the logged in user
    if (req.user.id !== post.user.toString()) {
      return res.status(401).json('User is not authorized.');
    }

    await post.remove();

    res.json('Post removed.');
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).status('This post could not be found.');
    }
    res.status(500).json('Server Error.');
  }
});

module.exports = postsRouter;
