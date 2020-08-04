const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const testApi = supertest(app);

// Check if a POST request to /api/users returns success code 200,
// and returns a token for authentication
test('a token is returned for authentication to indicate user is saved into db', async () => {
  let result = await testApi.post('/api/users');

  expect(result.status).toBe(200);
  expect(result.headers).toHaveProperty('token');

  // Close the db connection after all tests have been run.
  afterAll(() => {
    mongoose.connection.close();
  });
});

/**
 *  Attempt #1
 *  await testApi
    .post('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect.objectContaining({
      token: expect.any(String),
    });
 * 
 * 
 *  Attempt #2
 *  let result = await testApi.post('/api/users');

    expect(result.status).toBe(200);
    expect(result.headers).objectContaining({
    Content-Type: expect.toBe('application/json');
 * 
 * 
 * 
 */
