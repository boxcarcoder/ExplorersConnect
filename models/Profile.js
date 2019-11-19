const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    //every profile should be associated with a user
    type: mongoose.Schema.Types.ObjectId, //{_id:ObjectId:("..."), ...}
    ref: 'user' //reference the model we're referring to
  },
  bio: {
    type: String
  },
  passions: [
    {
      hiking: {
        locations: {
          type: [String]
        }
      },
      camping: {
        locations: {
          type: [String]
        }
      },
      waterSports: {
        locations: {
          type: [String]
        }
      },
      snowSports: {
        locations: {
          type: [String]
        }
      },
      rockClimbing: {
        locations: {
          type: [String]
        }
      },
      required: true
    }
  ],
  gear: [
    {
      winter: {
        type: [String]
      },
      spring: {
        type: [String]
      },
      summer: {
        type: [String]
      },
      fall: {
        type: [String]
      },
      required: true
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
