import mockPosts from './data/mock.posts';

const mockPostRepository = {
  find: jest.fn().mockResolvedValue(mockPosts),
};

export default mockPostRepository;
