export default {
  get: jest.fn(() =>
    Promise.resolve({
      data: 'GET test data',
    })
  ),
  post: jest.fn(() => Promise.resolve({ data: 'post test data' })),
};
