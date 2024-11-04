import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

describe('PostService', () => {
  let service: PostService;

  const dto = { title: 'test title', body: 'test body' };

  const mockPostRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new post record and return that', async () => {
    const post = await service.create(dto);
    expect(post).toEqual({ id: expect.any(Number), ...dto });
  });
});
