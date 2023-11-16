# Package Name: `nestjs-handler-factory`

## Description

The `nestjs-handler-factory` package provides a set of utility functions for handling common operations in a NestJS application. These operations include retrieving data from a database, creating new records, updating records, and deleting records. The package is designed to work seamlessly with NestJS and is written in TypeScript.

## Example Usage

### Importing Required Dependencies

First, you need to import the package and any necessary interfaces.

```typescript
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
} from 'handlerFactory';
import IQuery from 'interfaces/query.Interface';
```

1. `@nestjs/common` and `@nestjs/typeorm` are imports from the NestJS framework, used for creating a service and working with TypeORM repositories.
2. `CreatePostDto` and `UpdatePostDto` are DTO (Data Transfer Object) classes used for validating and transforming data when creating and updating posts.
3. `Repository` is imported from TypeORM and represents the repository for the `Post` entity.
4. `Post` represents the entity for posts, imported from your application.
5. `createOne`, `getAll`, `getOne`, `updateOneOne`, and `deleteOne` are functions imported from the `nestjs-handler-factory` package for handling CRUD operations.
6. `IQuery` is an interface for query parameters, possibly defined in your application.

### Creating a NestJS Service

```typescript
@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {}
```

1. `@Injectable()` is a decorator from NestJS, indicating that the `PostService` class is injectable and can be used as a service.
2. The `constructor` function initializes the `PostService` class. `@InjectRepository(Post)` injects the `Post` repository into the service, making it available for use within the class.

### Handling the "create" Operation

This function creates a new record in the repository with the provided payload.

```typescript
async create(createPostDto: CreatePostDto) {
  return createOne(this.postRepository, createPostDto);
}
```

1. The `create` method accepts a `createPostDto` object, which represents the data for creating a new post.
2. Inside the method, the `createOne` function from the `nestjs-handler-factory` package is used to create a new post record in the repository. The repository and the data to create are passed as arguments to the function.

### Handling the "findAll" Operation

This Operation retrieves a list of records from a repository based on the provided query parameters.

```typescript
async findAll(query: Partial<IQuery>) {
  return getAll(this.postRepository, query);
}
```

1. The `findAll` method accepts a `query` object of type `Partial<IQuery)`. This object contains query parameters for filtering, sorting, and pagination.
2. The method uses the `getAll` function from the `nestjs-handler-factory` package to retrieve a list of post records based on the provided query.

### Frontend Usage of the

When integrating your NestJS service with the frontend of your application, you'll need to make API requests with query parameters to customize the data you retrieve. Follow these steps to call query parameters in the frontend:

1. **Construct the API Request**:

   Start by constructing an HTTP request to your NestJS server. The query parameters should be included in this request to customize the data you receive.

2. **Include Query Parameters**:

   Depending on the specific API endpoint and server requirements, you can include query parameters in the URL or request body. For GET requests, append query parameters to the URL like this:

   ```plaintext
   GET /api/posts?limit=10&page=1&sort=createdAt&fields=title,author&search=keyword
   ```

### Handling the "findOne" Operation

This function retrieves a single record from a repository by its ID.

```typescript
findOne(id: string) {
  return getOne(this.postRepository, id);
}
```

1. The `findOne` method accepts an `id` of type `string`, representing the unique identifier of the post to retrieve.
2. Inside the method, the `getOne` function from the `nestjs-handler-factory` package is used to retrieve a single post record by its ID.

### Handling the "update" Operation

This function updates an existing record in the repository based on its ID.

```typescript
update(id: string, updatePostDto: UpdatePostDto) {
  return updateOneOne(this.postRepository, id, updatePostDto);
}
```

1. The `update` method accepts an `id` of type `string`, representing the unique identifier of the post to update, and an `updatePostDto` object containing the data to update in the post.
2. The method uses the `updateOneOne` function from the `nestjs-handler-factory` package to update an existing post record by its ID.

### Handling the "remove" Operation

This function deletes a record from the repository based on its ID.

```typescript
remove(id: string) {
  return deleteOne(this.postRepository, id);
}
```

1. The `remove` method accepts an `id` of type `string`, representing the unique identifier of the post to delete.
2. The method uses the `deleteOne` function from the `nestjs-handler-factory` package to remove a post record by its ID.

This explains each section of the code and its purpose within the NestJS service. It demonstrates how the `nestjs-handler-factory` package simplify the implementation of common CRUD operations for the `Post` entity.

## APIFeatures Class

The package also provides an `APIFeatures` class, which is used internally to process and filter query parameters. Users of the package generally do not need to interact directly with this class, but it can be extended or modified as needed.

## License

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please report them on the GitHub repository: [nestjs-handler-factory](https://github.com/Cedar1000/nestjs-handler-factory/issues).
