const mockPostService = {
  create: jest.fn((dto) => ({ ...dto, id: Date.now() })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  findOne: jest.fn((id) => ({ id })),
  findAll: jest.fn().mockResolvedValue([]),
};

export default mockPostService;
