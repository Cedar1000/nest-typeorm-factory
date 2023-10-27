import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PostModule } from '../src/post/post.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../src/post/entities/post.entity';
import mockPostRepository from './mocks/post.repository.mock';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule],
    })
      .overrideProvider(getRepositoryToken(Post))
      .useValue(mockPostRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/posts (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/posts?limit=2');
    console.log('res', res.body);
  });
});
