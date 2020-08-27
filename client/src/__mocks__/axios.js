export default {
  get: jest.fn(() => Promise.resolve({ data: 'get test data' })),
  post: jest.fn(() => Promise.resolve({ data: 'POST test data' })),
};
