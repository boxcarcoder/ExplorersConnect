const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const testApi = supertest(app);
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

// Initialize the test db with test data before every test to make tests more robust.
beforeEach(async () => {
  await User.deleteMany({});

  let userObject = new User(initialUsers[0]);
  await userObject.save();

  userObject = new User(initialUsers[1]);
  await userObject.save();

  userObject = new User(initialUsers[2]);
  await userObject.save();
});

describe('User registration.', () => {
  test('200. User registered successfully. A token is returned for authentication.', async () => {
    // Create a new test user for the HTTP request.
    const newTestUser = {
      name: 'TestUser',
      email: 'testuser@testuser.com',
      password: 'testuserpw',
    };
    const { name, email, password } = newTestUser;
    const body = JSON.stringify({ name, email, password });

    // Execute the test.
    let result = await testApi
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('token');
  });

  test('409. Email is registered already. User registration failed.', async () => {
    // Create a new test user for the HTTP request.
    const existingUser = {
      name: 'TestUser',
      email: 'testUser@gmail.com',
      password: 'testuserpw',
    };
    const { name, email, password } = existingUser;
    const body = JSON.stringify({ name, email, password });

    // Execute the test.
    let result = await testApi
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(result.status).toBe(409);
  });

  test('400. User does not input a name. User registration failed.', async () => {
    // Create a new test user for the HTTP request.
    const newTestUser = {
      email: 'testuser@testuser.com',
      password: 'testuserpw',
    };
    const { name, email, password } = newTestUser;
    const body = JSON.stringify({ name, email, password });

    // Execute the test.
    let result = await testApi
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(result.status).toBe(400);
  });

  test('400. User inputs an invalid email. User registration failed.', async () => {
    // Create a new test user for the HTTP request.
    const newTestUser = {
      name: 'TestUser',
      email: '',
      password: 'testuserpw',
    };
    const { name, email, password } = newTestUser;
    const body = JSON.stringify({ name, email, password });

    // Execute the test.
    let result = await testApi
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(body);

    expect(result.status).toBe(400);
  });
});

// Close the db connection after all tests have been run.
afterAll(async () => {
  await mongoose.connection.close();
});
