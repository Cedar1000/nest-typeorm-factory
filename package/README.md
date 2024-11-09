Here’s a comprehensive documentation for your `nestjs-handler-factory` package, highlighting installation, usage, and case scenarios for all API features.

---

# NestJS Handler Factory Documentation

`nestjs-handler-factory` is a utility package designed to streamline CRUD operations and advanced filtering in NestJS applications that use TypeORM. This package provides convenient handler functions for retrieving, creating, updating, and deleting records, with support for filtering, pagination, and field selection.

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

To use `nestjs-handler-factory` in your NestJS project, install it via npm:

```bash
npm install nestjs-handler-factory
```

Ensure you have TypeORM set up in your project, as it’s required for the package to function with your repositories.

---

## Usage

Import the package and utilize it within your NestJS service to handle common database operations.

### Step 1: Import the Package and Interfaces

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { factory } from 'nestjs-handler-factory';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { IQuery } from './interfaces/query.interface';
```

### Step 2: Define a Service with Repository Injection

```typescript
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}

  // CRUD operations implemented using factory functions from nestjs-handler-factory
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
async getAllPosts(query: Partial<IQuery>) {
  return factory.getAll(this.postRepository, query);
}
```

### Retrieving a Single Record

Use `getOne` to retrieve a single record by its ID.

```typescript
async getPostById(id: string) {
  return factory.getOne(this.postRepository, id);
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

## Advanced Query Options

Each function supports a set of advanced query options, which include filtering, sorting, pagination, and more.

### Filtering

Filter results based on fields, with advanced options like greater than, less than, and exact match.

```typescript
GET /posts?title=NestJS
GET /posts?gt=age,18&status=active
```

### Sorting

Sort records using `asc-fieldName` or `desc-fieldName`.

```typescript
GET /posts?sort=asc-title,desc-createdAt
```

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

Use the `search` parameter to match keywords.

```typescript
GET /posts?search=title,JavaScript
```

### Range Queries

Retrieve records within a range.

```typescript
GET /posts?range=createdAt,2023-01-01-2023-12-31
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
  "content": "Exploring the nestjs-handler-factory package."
}
```

#### Response

```json
{
  "status": "success",
  "data": {
    "id": "12345",
    "title": "My NestJS Post",
    "content": "Exploring the nestjs-handler-factory package."
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

`nestjs-handler-factory` is open-source software licensed under the MIT License.

---

For issues or contributions, visit [GitHub Repository](https://github.com/Cedar1000/nestjs-handler-factory).

---
