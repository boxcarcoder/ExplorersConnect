export default {
  get: jest.fn(() => Promise.resolve({ data: 'get test data' })),
  post: jest.fn(() => Promise.resolve({ data: 'POST test data' })),
  put: jest.fn(() => Promise.resolve({ data: 'put test data' })),
  delete: jest.fn(() => Promise.resolve({ data: 'delete test data' })),
};
