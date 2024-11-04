import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';

import { IQuery } from 'nest-handler-factory';
import * as factory from 'src/utils/handlerFactory';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return factory.createOne(this.postRepository, createPostDto);
  }

  async findAll(query: IQuery) {
    return factory.getAll(this.postRepository, query);
  }

  findOne(id: string, query: IQuery) {
    return factory.getOne(this.postRepository, id, query);
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return factory.updateOneOne(this.postRepository, id, updatePostDto);
  }

  remove(id: string) {
    return factory.deleteOne(this.postRepository, id);
  }
}
