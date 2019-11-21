const profilesRouter = require('express').Router();
const Profile = require('../models/Profile');
const auth = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/profiles/me
// @desc    Fetch a logged in user's profile
// @access  Private since it's for the logged in user
profilesRouter.get('/me', auth, async (req, res) => {
  try {
    // find the profile of the logged in user
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      res.status(400).json('This profile does not exist.');
    }

    res.json(profile);
  } catch (err) {
    //console.error(err.message);
    res.status(500).json('Server error.');
  }
});

// @route   POST api/profiles
// @desc    Create a profile for a logged in user
// @access  Private since it's for the logged in user
profilesRouter.post(
  '/',
  [
    auth,
    [
      check('bio', 'Please provide a bio')
        .not()
        .isEmpty(),
      check('country', 'Please provide your current country')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // create a profile for a user
    const {
      bio,
      country,
      //passions,
      //gears,
      youtube,
      twitter,
      facebook,
      instagram
    } = req.body;

    //Build object for the profile's fields
    let profileFields = {};
    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;
    if (country) profileFields.country = country;

    //Build social object for our profile's fields object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update the profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Create a new profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error.');
    }
  }
);

// @route   GET api/profiles/
// @desc    Fetch a user's profile
// @access  Public since we're requesting all profiles, not just one which will need a token
profilesRouter.get('/', async (req, res) => {
  try {
    // find the profile of a requested user
    let profiles = await Profile.find().populate('user', ['name', 'avatar']);

    if (!profiles) {
      res.status(400).json('There are no profiles.');
    }

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error.');
  }
});

// @route   GET api/profiles/user/:userID
// @desc    Fetch a user's profile by user ID
// @access  Public for anyone to look up a profile
profilesRouter.get('/user/:userID', async (req, res) => {
  try {
    // find the profile of a requested user
    let profile = await Profile.findOne({
      user: req.params.userID
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      res.status(400).json('There is no profile for this user.');
    }

    res.json(profile);
  } catch (err) {
    //console.error(err.message);
    res.status(500).json('Server error.');
  }
});

// @route   DELETE api/profiles/
// @desc    Delete a user, profile, and posts
// @access  Private since only a logged in user can delete their profile
profilesRouter.get('/', auth, async (req, res) => {
  try {
    //todo - remove posts

    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User and their profile deleted.' });
  } catch (err) {
    //console.error(err.message);
    res.status(500).json('Server error.');
  }
});

module.exports = profilesRouter;

// array of objects
// if (passions) {
//   profileFields.passions = passions
//     .split(',')
//     .map(passion => passion.trim());
// }
// if (gears) {
//   profileFields.gears = gears.split(',').map(gear => gear.trim()); //turn comma separated string into array by split, then map to remove spaces from each index
// }
