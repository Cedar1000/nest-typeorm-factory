Below is a comprehensive API documentation in `.md` format for the provided code:

---

# Post API Documentation

## Overview

This API allows for managing blog posts, including operations like creating, reading, updating, and deleting posts (CRUD). The API is built using NestJS, TypeORM, and supports advanced querying features such as filtering, sorting, pagination, and searching.

---

## Endpoints

### 1. **Create a Post**

#### **Endpoint:** `POST /posts`

#### **Request Body:**

```json
{
  "title": "string",
  "body": "string"
}
```

#### **Response:**

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "status": "success",
    "data": {
      "id": "string",
      "title": "string",
      "body": "string",
      "createdAt": "date-time"
    }
  }
  ```

### 2. **Get All Posts**

#### **Endpoint:** `GET /posts`

#### **Query Parameters (Optional):**

- **`page`**: Pagination - The page number.
- **`limit`**: Number of items per page.
- **`sort`**: Sorting criteria. Example: `asc-title,desc-createdAt`.
- **`fields`**: Fields to select. Example: `title,createdAt`.
- **`search`**: Search criteria. Example: `title,keyword`.
- **`relations`**: Relations to include in the response.

#### **Response:**

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "status": "success",
    "total": "number",
    "nextPage": "number | null",
    "prevPage": "number | null",
    "count": "number",
    "pages": "number",
    "currentPage": "number",
    "data": [
      {
        "id": "string",
        "title": "string",
        "body": "string",
        "createdAt": "date-time"
      }
    ]
  }
  ```

### 3. **Get a Single Post**

#### **Endpoint:** `GET /posts/:id`

#### **Path Parameter:**

- **`id`**: The ID of the post.

#### **Query Parameters (Optional):**

- **`relations`**: Relations to include in the response.

#### **Response:**

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "status": "success",
    "data": {
      "id": "string",
      "title": "string",
      "body": "string",
      "createdAt": "date-time"
    }
  }
  ```

### 4. **Update a Post**

#### **Endpoint:** `PATCH /posts/:id`

#### **Path Parameter:**

- **`id`**: The ID of the post.

#### **Request Body:**

```json
{
  "title": "string",
  "body": "string"
}
```

#### **Response:**

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "status": "success",
    "data": {
      "id": "string",
      "title": "string",
      "body": "string",
      "createdAt": "date-time"
    }
  }
  ```

### 5. **Delete a Post**

#### **Endpoint:** `DELETE /posts/:id`

#### **Path Parameter:**

- **`id`**: The ID of the post.

#### **Response:**

- **Status:** `204 No Content`

---

## Advanced Query Features

### 1. **Filtering**

You can filter results by including key-value pairs in the query string. The key is the field name and the value is the filter criteria.

#### **Example:**

`GET /posts?title=NestJS`

### 2. **Sorting**

You can sort results using the `sort` parameter. To sort in ascending order, use `asc-fieldName`; for descending, use `desc-fieldName`.

#### **Example:**

`GET /posts?sort=asc-title,desc-createdAt`

### 3. **Field Limiting**

You can limit the fields returned by specifying them in the `fields` parameter.

#### **Example:**

`GET /posts?fields=title,createdAt`

### 4. **Pagination**

Use the `page` and `limit` parameters for pagination.

#### **Example:**

`GET /posts?page=2&limit=5`

### 5. **Searching**

The `search` parameter allows you to perform partial matches across multiple fields.

#### **Example:**

`GET /posts?search=title,NestJS`

### 6. **Relations**

The `relations` parameter allows you to include related entities.

#### **Example:**

`GET /posts?relations=comments`

---

## Error Handling

### Common Errors:

1. **404 Not Found:**

   - **Message:** `No resource with that ID`
   - **Cause:** The resource with the provided ID does not exist.

2. **400 Bad Request:**
   - **Message:** `Invalid query parameters`
   - **Cause:** Provided query parameters are not valid.

---

## Response Structure

All successful responses follow this structure:

```json
{
  "status": "success",
  "data": {...} // Response data specific to the operation
}
```

In case of errors:

```json
{
  "status": "error",
  "message": "Error message"
}
```

---

## Technologies Used

- **NestJS**: Backend framework
- **TypeORM**: ORM for managing database interactions
- **MySQL**: Database management system
- **TypeScript**: Programming language used for development

---

## Getting Started

To run the API locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables for the database.
4. Run the application using `npm run start:dev`.

---

This documentation provides a detailed overview of the Post API, including available endpoints, query options, error handling, and setup instructions.

---
