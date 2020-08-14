const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const testApi = supertest(app);
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');

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

// Tokens for logged in users for profile creation.
var tokenUser1 = null;
var tokenUser2 = null;

// Ids for users in the database.
var user1ID = null;

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
  test('400. User does not input a bio for their profile. Profile creation failed.', async () => {
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

  test('400. User does not input a location for their profile. Profile creation failed.', async () => {
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

  test('200. Profile creation successful.', async () => {
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
  test('404. Profile for the logged in user not found. Fetch profile failed.', async () => {
    let result = await testApi
      .get('/api/profiles/me')
      .set('x-auth-token', tokenUser1);
    expect(result.status).toBe(404);
  });

  test('200. Fetch the logged in user profile succesfully.', async () => {
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

    //Execute the test
    let result = await testApi
      .get('/api/profiles/me')
      .set('x-auth-token', tokenUser1);

    expect(result.status).toBe(200);
  });
});

describe('Fetch all profiles.', () => {
  test('404. No profiles found. Fetch all profiles failed.', async () => {
    let result = await testApi.get('/api/profiles');
    expect(result.status).toBe(404);
  });

  test('200. Fetch all profiles successfully.', async () => {
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

    // Execute the test.
    let result = await testApi.get('/api/profiles');
    expect(result.status).toBe(200);
  });
});

describe('Fetch any user profile by user ID', () => {
  test('404. Profile for the requested user not found. Fetch profile failed.', async () => {
    let result = await testApi.get(`/api/profiles/user/${user1ID}`);
    expect(result.status).toBe(404);
  });
  test('200. Profile for the requested user found. Fetch profile successful.', async () => {
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

    // Execute the test.
    let result = await testApi.get(`/api/profiles/user/${user1ID}`);
    expect(result.status).toBe(200);
  });
});

// Close the db connection after all tests have been run.
afterAll(async () => {
  await mongoose.connection.close();
});
