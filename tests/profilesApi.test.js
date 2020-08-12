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

var token = null;

beforeEach(async () => {
  // Initialize the test db with test data before every test to make tests more robust.
  await User.deleteMany({});

  await Profile.deleteMany({});

  // Create salt for bcrypt to encrypt passwords
  let salt = await bcrypt.genSalt(10);

  // Save test user #1
  let userObject = new User(initialUsers[0]);
  userObject.password = await bcrypt.hash(userObject.password, salt);
  await userObject.save();

  // Save test user #2
  userObject = new User(initialUsers[1]);
  userObject.password = await bcrypt.hash(userObject.password, salt);
  await userObject.save();

  // Save test user #3
  userObject = new User(initialUsers[2]);
  userObject.password = await bcrypt.hash(userObject.password, salt);
  await userObject.save();

  // Log test user #1 in for authentication token.
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

  expect(result.status).toBe(200);
  expect(result.body).toHaveProperty('token');

  // Set test user #1's token for tests that require the token.
  token = result.body.token;
});

describe('A user profile.', () => {
  test('400. User does not input a bio for their profile.', async () => {
    // Set profile settings for test user #1.
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
      .set('x-auth-token', token)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    expect(result.status).toBe(400);
  });

  test('400. User does not input a location for their profile.', async () => {
    // Set profile settings for test user #1.
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
      .set('x-auth-token', token)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    expect(result.status).toBe(400);
  });

  test('200. A profile is created for the logged in user successfully.', async () => {
    // Set profile settings for test user #1.
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
      .set('x-auth-token', token)
      .set('Content-Type', 'application/json')
      .send(testProfile);

    expect(result.status).toBe(200);
  });
});

// Close the db connection after all tests have been run.
afterAll(async () => {
  await mongoose.connection.close();
});
