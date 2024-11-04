import { CreatePostDto } from '../dto/create-post.dto';

export const payload: CreatePostDto = {
  title: 'created posts title',
  body: 'created post body',
};

export const posts: CreatePostDto[] = [
  { title: 'test title 1', body: 'test body 1' },
  { title: 'test title 2', body: 'test body 2' },
  { title: 'test title 3', body: 'test body 3' },
  { title: 'test title 4', body: 'test body 4' },
  { title: 'test title 5', body: 'test body 5' },
];
