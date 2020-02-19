const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    //every profile should be associated with a user
    type: mongoose.Schema.Types.ObjectId, //{_id:ObjectId:("..."), ...}
    ref: 'User' //reference the model we're referring to
  },
  Hiking: {
    type: Boolean,
    default: false
  },
  Camping: {
    type: Boolean,
    default: false
  },
  Kayaking: {
    type: Boolean,
    default: false
  },
  Rafting: {
    type: Boolean,
    default: false
  },
  Skiing: {
    type: Boolean,
    default: false
  },
  Snowboarding: {
    type: Boolean,
    default: false
  },
  Rockclimbing: {
    type: Boolean,
    default: false
  },
  Other: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  faveRecreation: {
    type: String
  },
  destinations: [
    {
      hikingTrails: {
        type: [String]
      },
      campSites: {
        type: [String]
      },
      waterAreas: {
        type: [String]
      },
      slopes: {
        type: [String]
      },
      crags: {
        type: [String]
      }
    }
  ],
  gears: [
    {
      hikeGear: {
        type: [String]
      },
      campGear: {
        type: [String]
      },
      waterGear: {
        type: [String]
      },
      snowGear: {
        type: [String]
      },
      rockClimbingGear: {
        type: [String]
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);
