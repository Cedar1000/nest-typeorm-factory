import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import {
  createOne,
  getAll,
  getOne,
  updateOneOne,
  deleteOne,
} from '../utils/handlerFactory';

import IQuery from 'interfaces/query.Interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return createOne(this.postRepository, createPostDto);
  }

  async findAll(query: Partial<IQuery>) {
    return getAll(this.postRepository, query);
  }

  findOne(id: string) {
    return getOne(this.postRepository, id);
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return updateOneOne(this.postRepository, id, updatePostDto);
  }

  remove(id: string) {
    return deleteOne(this.postRepository, id);
  }
}
