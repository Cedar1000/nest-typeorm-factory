import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';

// import { PostModule } from '../src/post/post.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../src/post/entities/post.entity';
// import mockPostRepository from './mocks/post.repository.mock';

import TypeOrmPostgreSQLTestingModule from '../src/utils/TypeOrmSQLITETestingModule';
import { PostController } from '../src/post/post.controller';
import { PostService } from '../src/post/post.service';

//mocks
import { posts } from '../src/post/mocks/post.payload.mock';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  let postRepository: Repository<Post>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmPostgreSQLTestingModule(Post)],
      controllers: [PostController],
      providers: [PostService],
    }).compile();

    app = module.createNestApplication();
    (await app.init()).getHttpServer();

    // Initialize the repository
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));

    const promises = posts.map((post) => postRepository.save(post));

    await Promise.all(promises);
  });

  it('/posts (GET) (pagination)', async () => {
    const res = await request(app.getHttpServer()).get('/posts?limit=2');
    expect(res.body).toHaveLength(2);
  });

  it('/posts (GET) (filter)', async () => {
    const res = await request(app.getHttpServer()).get(
      '/posts?title=test title 1',
    );
    expect(res.body).toHaveLength(1);
  });

  it('/posts (GET) (search)', async () => {
    const res = await request(app.getHttpServer()).get(
      '/posts?search=title,test title 1-body,test body 1',
    );
    expect(res.body).toHaveLength(1);
  });

  it('/posts (GET) (sort)', async () => {
    const res = await request(app.getHttpServer()).get('/posts');

    const [post5, post4] = res.body;

    expect(post5.title).toEqual('test title 5');
    expect(post4.title).toEqual('test title 4');
  });

  afterAll(async () => {
    await postRepository.clear();
  });
});
