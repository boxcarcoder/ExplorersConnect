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
  passions: [
    {
      hiking: {
        locations: {
          type: [String]
        },
        favorite: {
          type: Boolean,
          default: false
        }
      },
      camping: {
        locations: {
          type: [String]
        },
        favorite: {
          type: Boolean,
          default: false
        }
      },
      waterSports: {
        locations: {
          type: [String]
        },
        favorite: {
          type: Boolean,
          default: false
        }
      },
      snowSports: {
        locations: {
          type: [String]
        },
        favorite: {
          type: Boolean,
          default: false
        }
      },
      rockClimbing: {
        locations: {
          type: [String]
        },
        favorite: {
          type: Boolean,
          default: false
        }
      }
    }
  ],
  gears: [
    {
      hiking: {
        type: [String]
      },
      camping: {
        type: [String]
      },
      waterSports: {
        type: [String]
      },
      snowSports: {
        type: [String]
      },
      rockClimbing: {
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
