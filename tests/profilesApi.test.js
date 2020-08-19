const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const testApi = supertest(app);
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');

// Globals for testing various API routes.

// Tokens for logged in users for profile creation.
var tokenUser1 = null;
var tokenUser2 = null;

// Ids for users and their profile settings in the database.
var user1ID = null;
var user1DestinationID = null;
var user1GearID = null;

// Objects for user1's favorite destinations and gears for testing.
var user1TestDestinations;
var user1TestGears;

// Create test data.
const initialUsers = [
  {
    name: 'testUser',
    email: 'testUser@gmail.com',
    password: 'testpw',
  },
  {
    name: 'testUser2',
    email: 'testUser2@gmail.com',
    password: 'testpw2',
  },
  {
    name: 'testUser3',
    email: 'testUser3@gmail.com',
    password: 'testpw3',
  },
];

beforeEach(async () => {
  // Initialize the test db with test data before every test to make tests more robust.
  await User.deleteMany({});
  await Profile.deleteMany({});

  // Create salt for bcrypt to encrypt passwords
  let salt = await bcrypt.genSalt(10);

  // Save test user #1
  let userObject = new User(initialUsers[0]);
  userObject.password = await bcrypt.hash(userObject.password, salt);
  await userObject.save(async function (err, user) {
    // Mongo sends the complete document as a callback object
    // that can be used to retrieve the object's id.
    // Necessary for API routes which require a user's ID.
    user1ID = user._id;
  });

  // Save test user #2
  userObject = new User(initialUsers[1]);
  userObject.password = await bcrypt.hash(userObject.password, salt);
  await userObject.save();

  // Save test user #3
  userObject = new User(initialUsers[2]);
  userObject.password = await bcrypt.hash(userObject.password, salt);
  await userObject.save();

  // Log an existing user in for authentication token.
  const testUser = {
    email: 'testUser@gmail.com',
    password: 'testpw',
  };
  const { email, password } = testUser;
  const body = JSON.stringify({ email, password });

  let result = await testApi
    .post('/api/auth')
    .set('Content-Type', 'application/json')
    .send(body);

  // Set the logged in user's token for tests that require the token.
  tokenUser1 = result.body.token;
});

describe('Create a user profile for logged in user.', () => {
  test('401. Failed to create profile. User is unauthenticated.', async () => {
    // Set profile settings for the logged in user.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: '',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    // Execute the test.
    let result = await testApi
      .post('/api/profiles/')
      .set('Content-Type', 'application/json')
      .send(testProfile);

    expect(result.status).toBe(401);
  });
  test('400. Failed to create profile. User did not input a bio for their profile.', async () => {
    // Set profile settings for the logged in user.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: '',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    // Execute the test.
    let result = await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    expect(result.status).toBe(400);
  });

  test('400. Failed to create profile. User did not input a location for their profile.', async () => {
    // Set profile settings for the logged in user.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: '',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    // Execute the test.
    let result = await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    expect(result.status).toBe(400);
  });

  test('200. Successfully created profile for logged in user.', async () => {
    // Set profile settings for the logged in user.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    // Execute the test.
    let result = await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    expect(result.status).toBe(200);
  });
});

describe('Fetch logged in user profile.', () => {
  beforeEach(async () => {
    // Create a user profile to be fetched.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);
  });

  test('401. Failed to fetch profile. User is unauthenticated.', async () => {
    let result = await testApi.get('/api/profiles/me');
    expect(result.status).toBe(401);
  });
  test('404. Failed to fetch the logged in user profile. Profile for the logged in user not found.', async () => {
    await Profile.deleteMany({});

    let result = await testApi
      .get('/api/profiles/me')
      .set('x-auth-token', tokenUser1);
    expect(result.status).toBe(404);
  });

  test('200. Sucessfully fetch the logged in user profile.', async () => {
    let result = await testApi
      .get('/api/profiles/me')
      .set('x-auth-token', tokenUser1);

    expect(result.status).toBe(200);
  });
});

describe('Fetch all profiles.', () => {
  beforeEach(async () => {
    // Create user profile #1 to be fetched.
    const testProfile1 = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile1);

    // Create user profile #2 to be fetched.
    const testUser2 = {
      email: 'testUser2@gmail.com',
      password: 'testpw2',
    };
    const { email, password } = testUser2;
    const body = JSON.stringify({ email, password });

    let res = await testApi
      .post('/api/auth')
      .set('Content-Type', 'application/json')
      .send(body);

    tokenUser2 = res.body.token;

    const testProfile2 = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio 2',
      location: 'test location 2, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser2)
      .set('Content-Type', 'application/json')
      .send(testProfile2);
  });

  test('404. Failed to fetch all profiles. No profiles found.', async () => {
    await Profile.deleteMany({});

    let result = await testApi.get('/api/profiles');
    expect(result.status).toBe(404);
  });

  test('200. Successfully fetched all profiles.', async () => {
    let result = await testApi.get('/api/profiles');
    expect(result.status).toBe(200);
  });
});

describe('Fetch any user profile by user ID.', () => {
  beforeEach(async () => {
    // Create a user profile to be fetched.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);
  });

  test('404. Failed to fetch profile by ID. Profile for the requested user not found.', async () => {
    await Profile.deleteMany({});

    let result = await testApi.get(`/api/profiles/user/${user1ID}`);
    expect(result.status).toBe(404);
  });
  test('200. Successfully fetched profile by ID. Profile for the requested user found.', async () => {
    let result = await testApi.get(`/api/profiles/user/${user1ID}`);
    expect(result.status).toBe(200);
  });
});

describe('Delete the logged in user profile.', () => {
  beforeEach(async () => {
    // Create a user profile to be deleted.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);
  });

  test('401. Failed to delete the logged in user profile. User is unauthenticated.', async () => {
    let result = await testApi.delete('/api/profiles');
    expect(result.status).toBe(401);
  });

  test('200. Sucessfully deleted the logged in user profile.', async () => {
    let result = await testApi
      .delete('/api/profiles')
      .set('x-auth-token', tokenUser1);
    expect(result.status).toBe(200);
  });
});

describe('Update destinations for a profile.', () => {
  beforeEach(async () => {
    // Create a user profile to have favorite destinations.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    // Update the profile's favorite destinations.
    user1TestDestinations = {
      hikingTrails: 'test trail',
      campSites: '',
      waterAreas: '',
      slopes: 'test slope',
      crags: '',
    };
  });

  test('401. Failed to update favorite destinations for the profile. User is unauthenticated.', async () => {
    let result = await testApi
      .put('/api/profiles/destinations')
      .send(user1TestDestinations);

    expect(result.status).toBe(401);
  });

  test('404. Failed to update favorite destinations for the profile. Profile not found.', async () => {
    await Profile.deleteMany({});

    let result = await testApi
      .put('/api/profiles/destinations')
      .set('x-auth-token', tokenUser1)
      .send(user1TestDestinations);

    expect(result.status).toBe(404);
  });

  test('200. Successfully updated favorite destinations for the profile.', async () => {
    let result = await testApi
      .put('/api/profiles/destinations')
      .set('x-auth-token', tokenUser1)
      .send(user1TestDestinations);

    expect(result.status).toBe(200);
  });
});

describe('Delete destinations for a profile.', () => {
  beforeEach(async () => {
    // Create a user profile to have destinations.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    // Update the profile's favorite destinations to be deleted.
    const testDestinations = {
      hikingTrails: 'test trail',
      campSites: '',
      waterAreas: '',
      slopes: 'test slope',
      crags: '',
    };

    let res = await testApi
      .put('/api/profiles/destinations')
      .set('x-auth-token', tokenUser1)
      .send(testDestinations);

    // Save the first set of favorite destinations to be deleted.
    user1DestinationID = res.body.destinations[0]._id;
  });

  test('200. Successfully deleted set of favorite destinations for a profile.', async () => {
    let result = await testApi
      .delete(`/api/profiles/destinations/${user1DestinationID}`)
      .set('x-auth-token', tokenUser1);

    expect(result.status).toBe(200);
  });

  test('401. Failed to delete favorite destinations for the profile. User is unauthenticated.', async () => {
    let result = await testApi.delete(
      `/api/profiles/destinations/${user1DestinationID}`
    );

    expect(result.status).toBe(401);
  });

  test('404. Failed to delete favorite destinations for the profile. Profile not found.', async () => {
    await Profile.deleteMany({});

    let result = await testApi
      .delete(`/api/profiles/destinations/${user1DestinationID._id}`)
      .set('x-auth-token', tokenUser1);
    expect(result.status).toBe(404);
  });
});

describe('Update gears for a profile.', () => {
  beforeEach(async () => {
    // Create a user profile to be updated with favorite gears.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    user1TestGears = {
      hikeGear: 'Black Diamond Trek Poles',
      campGear: '',
      waterGear: '',
      snowGear: '',
      rockClimbingGear: '',
    };
  });

  test('401. Failed to update favorite gears for the profile. User is unauthenticated.', async () => {
    let result = await testApi.put('/api/profiles/gears').send(user1TestGears);

    expect(result.status).toBe(401);
  });

  test('404. Failed to update favorite gears for the profile. Profile not found.', async () => {
    await Profile.deleteMany({});

    let result = await testApi
      .put('/api/profiles/gears')
      .set('x-auth-token', tokenUser1)
      .send(user1TestGears);

    expect(result.status).toBe(404);
  });

  test('200. Successfully updated favorite gears for the profile.', async () => {
    let result = await testApi
      .put('/api/profiles/gears')
      .set('x-auth-token', tokenUser1)
      .send(user1TestGears);

    expect(result.status).toBe(200);
  });
});

describe('Delete gears for a profile.', () => {
  beforeEach(async () => {
    // Create a user profile to have gears.
    const testProfile = {
      Hiking: false,
      Camping: false,
      Kayaking: false,
      Rafting: false,
      Skiing: false,
      Snowboarding: false,
      Rockclimbing: false,
      faveRecreation: '',
      website: '',
      bio: 'test bio',
      location: 'test location, CA',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
    };

    await testApi
      .post('/api/profiles/')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    // Update the profile's favorite gears to be deleted.
    const testGears = {
      hikeGear: 'Black Diamond Trek Poles',
      campGear: '',
      waterGear: '',
      snowGear: '',
      rockClimbingGear: '',
    };

    let res = await testApi
      .put('/api/profiles/gears')
      .set('x-auth-token', tokenUser1)
      .send(testGears);

    // Save the first set of favorite destinations to be deleted.
    user1GearID = res.body.gears[0];
  });

  test('200. Successfully deleted set of favorite gears for a profile.', async () => {
    let result = await testApi
      .delete(`/api/profiles/gears/${user1GearID._id}`)
      .set('x-auth-token', tokenUser1);

    expect(result.status).toBe(200);
  });

  test('401. Failed to delete favorite gears for the profile. User is unauthenticated.', async () => {
    let result = await testApi.delete(`/api/profiles/gears/${user1GearID._id}`);

    expect(result.status).toBe(401);
  });

  test('404. Failed to delete favorite gears for the profile. Profile not found.', async () => {
    await Profile.deleteMany({});

    let result = await testApi
      .delete(`/api/profiles/gears/${user1GearID._id}`)
      .set('x-auth-token', tokenUser1);
    expect(result.status).toBe(404);
  });
});

// Close the db connection after all tests have been run.
afterAll(async () => {
  await mongoose.connection.close();
});
