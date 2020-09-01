const postsRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');

const Post = require('../models/Post');
const User = require('../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private since only a logged in user can make a post
postsRouter.post(
  '/',
  [auth, [check('text', 'Please enter text for the post.').not().isEmpty()]],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // retrieve the logged in user from the db
      let user = await User.findById(req.user.id).select('-password');

      // create new post
      let newPost = new Post({
        text: req.body.text, //get the post text from the req
        name: user.name, //get the name and avatar of the logged in user from the db
        avatar: user.avatar,
        user: req.user.id, // get the user ID from the token of the logged in user
      });

      let post = await newPost.save();

      res.json(post);
    } catch (err) {
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
    res.status(500).json('Server Error.');
  }
});

// @route   GET api/posts/:postID
// @desc    Fetch post by ID
// @access  Public so site visitors can see posts for more exposure
postsRouter.get('/:postID', async (req, res) => {
  try {
    let post = await Post.findById(req.params.postID);

    if (!post) {
      return res.status(404).json('This post could not be found.');
    } else {
      res.json(post);
    }
  } catch (err) {
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

    if (!post) {
      return res.status(404).json('This post could not be found.');
    } else {
      // check if user is the logged in user
      if (req.user.id !== post.user.toString()) {
        return res.status(401).json('User is not authorized.');
      }

      await post.remove();

      res.json('Post removed.');
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).status('This post could not be found.');
    }
    res.status(500).json('Server Error.');
  }
});

// @route   PUT api/posts/like/:postID
// @desc    Like a post
// @access  Private since only a logged in user can like posts
postsRouter.put('/like/:postID', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postID);

    // check if the post has been liked already by the logged in user
    // prettier-ignore
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(405).json('Cannot like more than once');
    }
    else {
    // add the user to the post's likes array
      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.json(post.likes);
    }
  } catch (err) {
    res.status(500).json('Server Error.');
  }
});

// @route   PUT api/posts/unlike/:postID
// @desc    Unlike a post
// @access  Private since only a logged in user can unlike posts
postsRouter.put('/unlike/:postID', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postID);

    // check if the post has been liked already by the logged in user
    // prettier-ignore
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ) {
      return res.status(405).json('Post has not been liked yet.');
    }
    else {
      //get the remove index
      let removeIdx = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIdx, 1);

      await post.save();

      res.json(post.likes);
    }
  } catch (err) {
    res.status(500).json('Server Error.');
  }
});

// @route   POST api/posts/comment/:postID
// @desc    Comment on a post
// @access  Private since only a logged in user can comment on a post
postsRouter.post(
  '/comment/:postID',
  [auth, [check('text', 'Please enter text for the post.').not().isEmpty()]],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        // retrieve the logged in user from the db
        let user = await User.findById(req.user.id).select('-password');
        // retrieve the post by the post ID
        let post = await Post.findById(req.params.postID);

        // add new comment to the post
        let newComment = {
          text: req.body.text, //get the post text from the req
          name: user.name, //get the name and avatar of the logged in user from the db
          avatar: user.avatar,
          user: req.user.id, // get the user ID from the token of the logged in user
        };
        post.comments.unshift(newComment);

        await post.save();
        res.json(post.comments);
      } catch (err) {
        res.status(500).json('Server error.');
      }
    }
  }
);

// @route   DELETE api/posts/comment/:postID/:commentID
// @desc    Delete a comment from a post
// @access  Private since only a logged in user can delete a comment
postsRouter.delete('/comment/:postID/:commentID', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postID);

    //retrieve the comment
    let comment = post.comments.find(
      (comment) => comment.id === req.params.commentID
    );

    if (!comment) {
      return res.status(404).json('Comment does not exist.');
    } else {
      // check if user is the logged in user
      if (req.user.id !== comment.user.toString()) {
        return res.status(401).json('User is not authorized.');
      }

      //get the remove index
      let removeIdx = post.comments
        .map((comment) => comment.user.toString())
        .indexOf(req.user.id);

      post.comments.splice(removeIdx, 1);

      await post.save();

      res.json(post.comments);
    }
  } catch (err) {
    res.status(500).json('Server error.');
  }
});

module.exports = postsRouter;
