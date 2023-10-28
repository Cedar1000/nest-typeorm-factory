import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
// import { Post } from './entities/post.entity';

// import TypeOrmSQLITETestingModule from '../utils/TypeOrmSQLITETestingModule';

//mocks
import mockPostService from './mocks/post.service.mock';

describe('PostController', () => {
  let controller: PostController;
  const dto = { title: 'test title', body: 'test body' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [...TypeOrmSQLITETestingModule(Post)],
      controllers: [PostController],
      providers: [PostService],
    })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', async () => {
    const post = await controller.create(dto);
    expect(post).toEqual({ ...post, id: expect.any(Number) });
  });

  it('should update a post', async () => {
    const updatedPost = await controller.update('hdee8', dto);
    expect(updatedPost).toEqual({ ...updatedPost, id: 'hdee8' });
  });

  it('should get a single post', async () => {
    const post = await controller.findOne('id');
    expect(post).toEqual({ ...post, id: 'id' });
  });

  it('should get all posts', async () => {
    const post = await controller.findAll({});
    expect(post).toBeDefined();
  });
});
