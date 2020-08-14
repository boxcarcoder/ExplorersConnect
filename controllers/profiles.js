const profilesRouter = require('express').Router();
const Profile = require('../models/Profile');
const User = require('../models/User');
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
      res.status(404).json('This profile does not exist.');
    } else {
      res.json(profile);
    }
  } catch (err) {
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
      check('bio', 'Please provide a bio').not().isEmpty(),
      check('location', 'Please provide your current location').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // create a profile for a user
    const {
      Hiking,
      Camping,
      Kayaking,
      Rafting,
      Skiing,
      Snowboarding,
      Rockclimbing,
      faveRecreation,
      bio,
      location,
      website,
      youtube,
      twitter,
      facebook,
      instagram,
    } = req.body;

    //Build object for the profile's fields
    let profileFields = {};
    profileFields.user = req.user.id; // get the user ID from the token of the logged in user

    //If these fields are populated, fill out profileFields to save into DB
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;

    //Save recreations into profileFields for both true and false.
    profileFields.Hiking = Hiking;
    profileFields.Camping = Camping;
    profileFields.Kayaking = Kayaking;
    profileFields.Rafting = Rafting;
    profileFields.Skiing = Skiing;
    profileFields.Snowboarding = Snowboarding;
    profileFields.Rockclimbing = Rockclimbing;

    if (faveRecreation) profileFields.faveRecreation = faveRecreation;

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
// @desc    Fetch all profiles
// @access  Public since we're requesting all profiles, not just one which will need a token
profilesRouter.get('/', async (req, res) => {
  try {
    // find the profile of all users
    let profiles = await Profile.find().populate('user', ['name', 'avatar']);

    if (profiles.length === 0) {
      res.status(404).json('There are no profiles.');
    } else {
      res.json(profiles);
    }
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
      user: req.params.userID,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      res.status(404).json('There is no profile for this user.');
    } else {
      res.json(profile);
    }
  } catch (err) {
    res.status(500).json('Server error.');
  }
});

// @route   DELETE api/profiles/
// @desc    Delete a user, profile, and posts
// @access  Private since only a logged in user can delete their profile
profilesRouter.delete('/', auth, async (req, res) => {
  try {
    //todo - remove posts

    await Profile.findOneAndRemove({ user: req.user.id }); //*** */

    await User.findOneAndRemove({ _id: req.user.id }); //*** */

    res.json({ msg: 'User and their profile deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error.');
  }
});

// @route   PUT api/profiles/destinations
// @desc    Update a profile's destinations
// @access  Private since only a logged in user can update their profile
profilesRouter.put('/destinations', auth, async (req, res) => {
  try {
    let { hikingTrails, campSites, waterAreas, slopes, crags } = req.body;

    //update the logged in user's Destinations
    let updatedDestinations = {
      hikingTrails,
      campSites,
      waterAreas,
      slopes,
      crags,
    };

    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) res.status(400).json('This profile does not exist.');

    profile.destinations.unshift(updatedDestinations);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error.');
  }
});

// @route   DELETE api/profiles/destinations/:destinationsID
// @desc    Delete a profile's destinations by ID
// @access  Private since only a logged in user can update their profile
profilesRouter.delete(
  '/destinations/:destinationsID',
  auth,
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) res.status(400).json('This profile does not exist.');

      //get the remove index
      let removeIdx = profile.destinations
        .map((obj) => obj.id)
        .indexOf(req.params.destinationsID);

      profile.destinations.splice(removeIdx, 1);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error.');
    }
  }
);

// @route   PUT api/profiles/gears
// @desc    Update a profile's gears
// @access  Private since only a logged in user can update their profile
profilesRouter.put('/gears', auth, async (req, res) => {
  try {
    let {
      hikeGear,
      campGear,
      waterGear,
      snowGear,
      rockClimbingGear,
    } = req.body;

    //update the logged in user's gears
    let updatedGears = {
      hikeGear,
      campGear,
      waterGear,
      snowGear,
      rockClimbingGear,
    };

    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) res.status(400).json('This profile does not exist.');

    profile.gears.unshift(updatedGears);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.messsage);
    res.status(500).json('Server error.');
  }
});

// @route   DELETE api/profiles/gears/:gearsID
// @desc    Delete a profile's gears by ID
// @access  Private since only a logged in user can update their profile
profilesRouter.delete('/gears/:gearsID', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) res.status(400).json('This profile does not exist.');

    //get the remove index
    let removeIdx = profile.gears
      .map((obj) => obj.id)
      .indexOf(req.params.gearsID);

    profile.gears.splice(removeIdx, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error.');
  }
});

module.exports = profilesRouter;
