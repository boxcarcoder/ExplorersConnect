const profilesRouter = require("express").Router();

// @route   GET api/profiles
// @desc    Test route for profiles route
// @access  Public
profilesRouter.get("/", (req, res) => {
  res.json("profiles route.");
});

module.exports = profilesRouter;
