Here’s a comprehensive documentation for your `nest-typeorm-factory` package, highlighting installation, usage, and case scenarios for all API features.

---

# NestJS TypeOrm Factory Documentation

`nest-typeorm-factory` is a utility package designed to streamline CRUD operations and advanced filtering in NestJS applications that use TypeORM. This package provides convenient handler functions for retrieving, creating, updating, and deleting records, with support for filtering, pagination, sorting, field selection and populating inter-table relationships.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Operations](#api-operations)
   - [Creating a Record](#creating-a-record)
   - [Retrieving All Records with Filters](#retrieving-all-records-with-filters)
   - [Retrieving a Single Record](#retrieving-a-single-record)
   - [Updating a Record](#updating-a-record)
   - [Deleting a Record](#deleting-a-record)
4. [Advanced Query Options](#advanced-query-options)
   - [Filtering](#filtering)
   - [Sorting](#sorting)
   - [Field Selection](#field-selection)
   - [Pagination](#pagination)
   - [Searching](#searching)
   - [Range Queries](#range-queries)
5. [Error Handling](#error-handling)
6. [Examples](#examples)

---

## Installation

To use `nest-typeorm-factory` in your NestJS project, install it via npm:

```bash
npm install nest-typeorm-factory
```

Ensure you have TypeORM set up in your project, as it’s required for the package to function with your repositories.

---

## Usage

Import the package and utilize it within your NestJS service to handle common database operations.

Let's create 2 entities, one for `Post`, the other for `User`

The `User`

```
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}

```

The `Post`

```
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default:0 })
  reposts: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}

```

> **⚠️ Warning:**  
> When creating your entities be sure to add `createdAt` field.

### Step 1: Import the Package and Interfaces

```typescript
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

//DTOs
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

//Entities
import { Post } from './entities/post.entity';

//Package
import { factory, IQuery } from 'nestjs-typeorm-factory';
```

### Step 2: Define a Service with Repository Injection

```typescript
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}

  // CRUD operations implemented using factory functions from nest-typeorm-factory
}
```

---

## API Operations

### Creating a Record

Use the `createOne` function to create a new record. This method takes a repository instance and the data to create as arguments.

```typescript
async createPost(createPostDto: CreatePostDto) {
  return factory.createOne(this.postRepository, createPostDto);
}
```

### Retrieving All Records with Filters

Retrieve a list of records with advanced query options by using `getAll`.

```typescript
async getAllPosts(query: IQuery) {
  return factory.getAll(this.postRepository, query);
}
```

### Retrieving a Single Record

Use `getOne` to retrieve a single record by its ID.

```typescript
async getPostById(id: string, query: IQuery) {
  return factory.getOne(this.postRepository, id, query);
}
```

### Updating a Record

Use `updateOne` to update an existing record by its ID.

```typescript
async updatePost(id: string, updatePostDto: UpdatePostDto) {
  return factory.updateOne(this.postRepository, id, updatePostDto);
}
```

### Deleting a Record

Use `deleteOne` to delete a record by its ID.

```typescript
async deletePost(id: string) {
  return factory.deleteOne(this.postRepository, id);
}
```

---

## Controller Setup

Making use of the package, this is what your controller will look like.

```
import {
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { IQuery } from 'nest-typeorm-factory';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll(@Query() query: IQuery) {
    return this.postService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query: IQuery) {
    return this.postService.findOne(id, query);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}

```

## Advanced Query Options

Each function supports a set of advanced query options, which include filtering, sorting, pagination, and more.

### Filtering

Filter results based on fields that are an exact match.

```typescript
GET /posts?title=NestJS
```

### Advanced Filtering

Filter results with advanced options like greater than, less than, greater than or equals, less than or equals.

```typescript
GET /posts?gt=reposts,50
```

```typescript
GET /posts?gte=reposts,50
```

```typescript
GET /posts?lt=reposts,50
```

```typescript
GET /posts?lte=reposts,50
```

### Sorting

Sort records using `asc-fieldName` or `desc-fieldName`.

```typescript
GET /posts?sort=asc-title
```

OR

```typescript
GET /posts?sort=desc-createdAt
```

> **⚠️ Note:**  
> If no sort parameter is passed in, it will sort by the `createdAt` property by default.

### Field Selection

Limit the fields returned by specifying `fields`.

```typescript
GET /posts?fields=title,createdAt
```

### Pagination

Control pagination with `page` and `limit`.

```typescript
GET /posts?page=2&limit=5
```

### Searching

Use the `search` parameter to match keywords like so.

```typescript
GET /posts?search=fieldA,searchTermA
```

```typescript
GET /posts?search=title,JavaScri
```

### Multiple Field Searching

You can also search against multiple fields.

```typescript
GET /posts?search=fieldA,searchTermA-fieldB,searchTermB
```

```typescript
GET /posts?search=title,JavaScri-content,variables
```

### Range Queries

Retrieve records that have the value of a particular field within a range.

```typescript
GET /posts?range=reposts,5-50
```

### Populate Relationship

Populate Inter Table relationships while querying records. This works for all kinds of relationships, i.e `One-To-One`, `Many-To-One`, `One-To-Many` and `Many-To-Many`

```typescript
GET /posts?relations=user
```

### Populate Multiple Relationships

Supposing our entity has multiple relationships with other tables. This is how we'll do it

```typescript
GET /posts?relations=user,fieldB,fieldC
```

The same also works for getting a resource by id

```typescript
GET /posts/{id}?relations=user
```

```typescript
GET /posts/{id}?relations=user,fieldB,fieldC
```

### Combining Multiple API Features

You can combine multiple API features together like so

```typescript
GET /posts?title=JavaScri&reposts=5&relations=user&page=2&sort=desc-createdAt
```

---

## Error Handling

The package provides consistent error handling with descriptive messages for missing records, invalid parameters, and other common issues.

### Common Errors

1. **404 Not Found** - Record does not exist.
2. **400 Bad Request** - Invalid parameters provided.

---

## Examples

### Create Post

#### Request

```http
POST /posts
Content-Type: application/json

{
  "title": "My NestJS Post",
  "content": "Exploring the nest-typeorm-factory package."
  "userId": "67890"
}
```

#### Response

```json
{
  "status": "success",
  "data": {
    "id": "12345",
    "title": "My NestJS Post",
    "content": "Exploring the nest-typeorm-factory package."
    "user": {
      "id": "67890",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
  }
}
```

### Get All Posts with Filters

#### Request

```http
GET /posts?sort=asc-title&page=1&limit=10&search=title,NestJS
```

#### Response

```json
{
  "status": "success",
  "data": [
    {
      "id": "12345",
      "title": "My NestJS Post",
      "createdAt": "2023-11-01T10:00:00Z"
    }
  ]
}
```

### Update Post

#### Request

```http
PATCH /posts/12345
Content-Type: application/json

{
  "title": "Updated NestJS Post Title"
}
```

#### Response

```json
{
  "status": "success",
  "data": {
    "id": "12345",
    "title": "Updated NestJS Post Title",
    "updatedAt": "2023-11-01T10:30:00Z"
  }
}
```

### Delete Post

#### Request

```http
DELETE /posts/12345
```

#### Response

```json
{
  "status": "success",
  "message": "Post deleted successfully"
}
```

---

## License

`nest-typeorm-factory` is open-source software licensed under the MIT License.

---

For issues or contributions, visit [GitHub Repository](https://github.com/Cedar1000/nest-typeorm-factory).

---
