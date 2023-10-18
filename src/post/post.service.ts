import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll() {
    const posts = await this.postRepository.find({
      skip: 10,
      take: 2,
      order: { createdAt: 'DESC' },
      where: { title: 'hi' },
      select: ['title', 'body'],
    });
    return { results: posts.length, posts };
  }

  findOne(id: string) {
    return this.postRepository.findBy({ id });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postRepository.update({ id }, updatePostDto);
  }

  remove(id: string) {
    return this.postRepository.delete({ id });
  }
}
