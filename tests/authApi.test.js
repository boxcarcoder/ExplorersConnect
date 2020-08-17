const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const testApi = supertest(app);
const bcrypt = require('bcryptjs');
const User = require('../models/User');

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

  // Create salt for bcrypt to encrypt passwords
  let salt = await bcrypt.genSalt(10);

  // Create test user #1
  let userObject = new User(initialUsers[0]);
  userObject.password = await bcrypt.hash(userObject.password, salt);
  await userObject.save();

  // Create test user #2
  userObject = new User(initialUsers[1]);
  userObject.password = await bcrypt.hash(userObject.password, salt);
  await userObject.save();

  // Create test user #3
  userObject = new User(initialUsers[2]);
  userObject.password = await bcrypt.hash(userObject.password, salt);
  await userObject.save();
});

describe('User login.', () => {
  test('400. Failed to log user in. User inputs an invalid email.', async () => {
    // Use an existing user for the HTTP request.
    const testUser = {
      email: '',
      password: 'testpw',
    };
    const { email, password } = testUser;
    const body = JSON.stringify({ email, password });

    // Execute the test.
    let result = await testApi
      .post('/api/auth')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(result.status).toBe(400);
  });

  test('400. Failed to log user in. User does not input a password.', async () => {
    // Use an existing user for the HTTP request.
    const testUser = {
      email: 'testUser@gmail.com',
    };
    const { email, password } = testUser;
    const body = JSON.stringify({ email, password });

    // Execute the test.
    let result = await testApi
      .post('/api/auth')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(result.status).toBe(400);
  });

  test('401. Failed to log user in. User inputs an incorrect password.', async () => {
    // Use an existing user for the HTTP request.
    const testUser = {
      email: 'testUser@gmail.com',
      password: '',
    };
    const { email, password } = testUser;
    const body = JSON.stringify({ email, password });

    // Execute the test.
    let result = await testApi
      .post('/api/auth')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(result.status).toBe(401);
  });

  test('404. Failed to log user in. User account does not exist in database.', async () => {
    // Use a non-registered user for the HTTP request.
    const testUser = {
      email: 'nonUser@gmail.com',
      password: 'testpw',
    };
    const { email, password } = testUser;
    const body = JSON.stringify({ email, password });

    // Execute the test.
    let result = await testApi
      .post('/api/auth')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(result.status).toBe(404);
  });

  test('200. Successfully logged user in. A token is returned for authentication.', async () => {
    // Use an existing user for the HTTP request.
    const testUser = {
      email: 'testUser@gmail.com',
      password: 'testpw',
    };
    const { email, password } = testUser;
    const body = JSON.stringify({ email, password });

    // Execute the test.
    let result = await testApi
      .post('/api/auth')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('token');

    // Set the logged in user's token for tests that require the token.
    token = result.body.token;
  });

  test('401. Failed to fetch user profile after log in. User is unauthenticated.', async () => {
    let result = await testApi.get('/api/auth');
    expect(result.status).toBe(401);
  });

  test('200. Successfully fetched user profile after login.', async () => {
    let result = await testApi.get('/api/auth').set('x-auth-token', token);
    expect(result.status).toBe(200);
  });
});

// Close the db connection after all tests have been run.
afterAll(async () => {
  await mongoose.connection.close();
});
