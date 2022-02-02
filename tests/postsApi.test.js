const app = require('../app');
const supertest = require('supertest');
const testApi = supertest(app);
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

// Globals for testing various API routes.

// Tokens for logged in users for profile creation.
var tokenUser1 = null;

// IDs
var postID = null;
var commentID = null;

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

describe('Post API Routes.', () => {
  beforeEach(async () => {
    // Initialize the test db with test data before every test to make tests more robust.
    await User.deleteMany({});
    await Post.deleteMany({});

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

    tokenUser1 = result.body.token;

    // Send a post to the database.
    let testText = {
      text: 'testing',
    };

    let res = await testApi
      .post('/api/posts')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testText);

    postID = res.body._id;

    // Send another post to the database.
    testText = {
      text: 'testing2',
    };

    await testApi
      .post('/api/posts')
      .set('x-auth-token', tokenUser1)
      .set('Content-Type', 'application/json')
      .send(testText);
  });

  describe('Create a post.', () => {
    test('401. Failed to create a post. User is unauthenticated.', async () => {
      const testText = {
        text: 'testing',
      };
      let result = await testApi
        .post('/api/posts')
        .set('Content-Type', 'application/json')
        .send(testText);

      expect(result.status).toBe(401);
    });

    test('400. Failed to create a post. User did not enter any text.', async () => {
      // Create a test post's text.
      const testText = {
        text: '',
      };

      // Execute the test.
      let result = await testApi
        .post('/api/posts')
        .set('x-auth-token', tokenUser1)
        .set('Content-Type', 'application/json')
        .send(testText);

      expect(result.status).toBe(400);
    });

    test('200. Successfully created a post.', async () => {
      // Create a test post's text.
      const testText = {
        text: 'testing',
      };

      // Execute the test.
      let result = await testApi
        .post('/api/posts')
        .set('x-auth-token', tokenUser1)
        .set('Content-Type', 'application/json')
        .send(testText);

      expect(result.status).toBe(200);
    });
  });

  describe('Fetch all posts.', () => {
    test('200. Successfully fetched 0 posts.', async () => {
      await Post.deleteMany({});
      let result = await testApi.get('/api/posts');
      expect(result.status).toBe(200);
    });

    test('200. Successfully fetched all posts.', async () => {
      let result = await testApi.get('/api/posts');
      expect(result.status).toBe(200);
    });
  });

  describe('Fetch a post by post ID.', () => {
    test('404. Failed to fetch a post by ID. Post not found.', async () => {
      await Post.deleteMany({});
      let result = await testApi.get(`/api/posts/${postID}`);
      expect(result.status).toBe(404);
    });

    test('200. Successfully fetched a post by ID.', async () => {
      let result = await testApi.get(`/api/posts/${postID}`);
      expect(result.status).toBe(200);
    });
  });

  describe('Delete a post by ID.', () => {
    test('401. Failed to delete a post by ID. User is unauthenticated.', async () => {
      let result = await testApi.delete(`/api/posts/${postID}`);
      expect(result.status).toBe(401);
    });

    test('404. Failed to delete a post by ID. Post not found.', async () => {
      await Post.deleteMany({});
      let result = await testApi
        .delete(`/api/posts/${postID}`)
        .set('x-auth-token', tokenUser1);
      expect(result.status).toBe(404);
    });

    test('401. Failed to delete a post by ID. User is not authorized.', async () => {
      let wrongTokenUser1 = 'badtoken';
      let result = await testApi
        .delete(`/api/posts/${postID}`)
        .set('x-auth-token', wrongTokenUser1);
      expect(result.status).toBe(401);
    });

    test('200. Successfully deleted a post by ID.', async () => {
      let result = await testApi
        .delete(`/api/posts/${postID}`)
        .set('x-auth-token', tokenUser1);
      expect(result.status).toBe(200);
    });
  });

  describe('Like a post.', () => {
    test('401. Failed to like a post. User is unauthenticated.', async () => {
      let result = await testApi.put(`/api/posts/like/${postID}`);
      expect(result.status).toBe(401);
    });

    test('405. Failed to like a post. User cannot like same post more than once.', async () => {
      // Like a post to test liking the same post again.
      await testApi
        .put(`/api/posts/like/${postID}`)
        .set('x-auth-token', tokenUser1);

      // Execute the test.
      let result = await testApi
        .put(`/api/posts/like/${postID}`)
        .set('x-auth-token', tokenUser1);
      expect(result.status).toBe(405);
    });

    test('200. Successfully liked a post.', async () => {
      let result = await testApi
        .put(`/api/posts/like/${postID}`)
        .set('x-auth-token', tokenUser1);
      expect(result.status).toBe(200);
    });
  });

  describe('Unlike a post.', () => {
    test('401. Failed to unlike a post. User is unauthenticated.', async () => {
      let result = await testApi.put(`/api/posts/unlike/${postID}`);
      expect(result.status).toBe(401);
    });

    test('405. Failed to unlike a post. Post has not been liked yet.', async () => {
      let result = await testApi
        .put(`/api/posts/unlike/${postID}`)
        .set('x-auth-token', tokenUser1);
      expect(result.status).toBe(405);
    });

    test('200. Successfully unliked a post.', async () => {
      // Like a post to test unliking the same post.
      await testApi
        .put(`/api/posts/like/${postID}`)
        .set('x-auth-token', tokenUser1);

      let result = await testApi
        .put(`/api/posts/unlike/${postID}`)
        .set('x-auth-token', tokenUser1);
      expect(result.status).toBe(200);
    });
  });

  describe('Comment on a post.', () => {
    test('401. Failed to comment on a post. User is unauthenticated.', async () => {
      let testComment = {
        text: 'test comment',
      };

      let result = await testApi
        .post(`/api/posts/comment/${postID}`)
        .send(testComment);
      expect(result.status).toBe(401);
    });

    test('400. Failed to comment on a post. User did not input any text.', async () => {
      let testComment = {
        text: '',
      };

      let result = await testApi
        .post(`/api/posts/comment/${postID}`)
        .set('x-auth-token', tokenUser1)
        .send(testComment);
      expect(result.status).toBe(400);
    });

    test('200. Successfully commented on a post.', async () => {
      let testComment = {
        text: 'test comment',
      };

      let result = await testApi
        .post(`/api/posts/comment/${postID}`)
        .set('x-auth-token', tokenUser1)
        .send(testComment);
      expect(result.status).toBe(200);
    });
  });

  describe('Delete a comment from a post.', () => {
    beforeEach(async () => {
      // Create a comment to be deleted.
      let testComment = {
        text: 'test comment',
      };

      let result = await testApi
        .post(`/api/posts/comment/${postID}`)
        .set('x-auth-token', tokenUser1)
        .send(testComment);

      // Save the first comment to be deleted.
      commentID = result.body[0]._id;
    });

    test('401. Failed to delete a comment from a post. User is unauthenticated.', async () => {
      let result = await testApi.delete(
        `/api/posts/comment/${postID}/${commentID}`
      );
      expect(result.status).toBe(401);
    });

    test('404. Failed to delete a comment from a post. Comment not found.', async () => {
      // Delete the comment so it can no longer be found.
      await testApi
        .delete(`/api/posts/comment/${postID}/${commentID}`)
        .set('x-auth-token', tokenUser1);

      let result = await testApi
        .delete(`/api/posts/comment/${postID}/${commentID}`)
        .set('x-auth-token', tokenUser1);
      expect(result.status).toBe(404);
    });

    test('401. Failed to delete a comment from a post. User is not authorized.', async () => {
      let wrongTokenUser1 = 'badtoken';

      let result = await testApi
        .delete(`/api/posts/comment/${postID}/${commentID}`)
        .set('x-auth-token', wrongTokenUser1);
      expect(result.status).toBe(401);
    });

    test('200. Successfully deleted a comment from a post.', async () => {
      let result = await testApi
        .delete(`/api/posts/comment/${postID}/${commentID}`)
        .set('x-auth-token', tokenUser1);
      expect(result.status).toBe(200);
    });
  });
});

// Close the db connection after all tests have been run.
afterAll(async () => {
  await mongoose.connection.close();
});
