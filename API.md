# API Documentation

This document provides detailed information about the API endpoints available in the Hacker News Clone application.

## Base URL

All API endpoints are prefixed with `/api`.

## Authentication

Authentication is handled via JSON Web Tokens (JWT). For protected endpoints, include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Error Responses

All endpoints may return the following error responses:

```json
{
  "error": "Error message describing the issue"
}
```

---

## Auth Endpoints

### Register a New User

```
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string"
}
```

### User Login

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string"
}
```

---

## Post Endpoints

### Get All Posts

```
GET /api/posts
```

**Request Parameters:**
- `page`: integer (optional, default: 1)
- `limit`: integer (optional, default: 10)
- `sort`: string (optional, options: 'new', 'top', 'best', default: 'new')

**Response:**
```json
{
  "posts": [
    {
      "id": "integer",
      "title": "string",
      "url": "string | null",
      "text": "string | null",
      "points": "integer",
      "createdAt": "datetime",
      "author": {
        "id": "integer",
        "name": "string"
      },
      "_count": {
        "comments": "integer"
      }
    }
  ],
  "totalPages": "integer",
  "currentPage": "integer"
}
```

### Search Posts

```
GET /api/posts/search
```

**Request Parameters:**
- `query`: string (required)
- `page`: integer (optional, default: 1)
- `limit`: integer (optional, default: 10)

**Response:**
```json
{
  "posts": [
    {
      "id": "integer",
      "title": "string",
      "url": "string | null",
      "text": "string | null",
      "points": "integer",
      "createdAt": "datetime",
      "author": {
        "id": "integer",
        "name": "string"
      },
      "_count": {
        "comments": "integer"
      }
    }
  ],
  "totalPages": "integer",
  "currentPage": "integer"
}
```

### Get a Single Post

```
GET /api/posts/:id
```

**URL Parameters:**
- `id`: integer (required)

**Response:**
```json
{
  "id": "integer",
  "title": "string",
  "url": "string | null",
  "text": "string | null",
  "points": "integer",
  "createdAt": "datetime",
  "author": {
    "id": "integer",
    "name": "string"
  },
  "comments": [
    {
      "id": "integer",
      "text": "string",
      "createdAt": "datetime",
      "author": {
        "id": "integer",
        "name": "string"
      },
      "children": [
        {
          "id": "integer",
          "text": "string",
          "createdAt": "datetime",
          "author": {
            "id": "integer",
            "name": "string"
          }
        }
      ]
    }
  ],
  "_count": {
    "comments": "integer"
  }
}
```

### Create a Post

```
POST /api/posts
```

**Authentication Required**

**Request Body:**
```json
{
  "title": "string",
  "url": "string | null",
  "text": "string | null"
}
```
Note: Either `url` or `text` must be provided.

**Response:**
```json
{
  "id": "integer",
  "title": "string",
  "url": "string | null",
  "text": "string | null",
  "authorId": "integer",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "points": "integer"
}
```

### Update a Post

```
PUT /api/posts/:id
```

**Authentication Required**

**URL Parameters:**
- `id`: integer (required)

**Request Body:**
```json
{
  "title": "string",
  "url": "string | null",
  "text": "string | null"
}
```

**Response:**
```json
{
  "id": "integer",
  "title": "string",
  "url": "string | null",
  "text": "string | null",
  "authorId": "integer",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "points": "integer"
}
```

### Delete a Post

```
DELETE /api/posts/:id
```

**Authentication Required**

**URL Parameters:**
- `id`: integer (required)

**Response:**
```json
{
  "message": "Post deleted successfully"
}
```

### Vote on a Post

```
POST /api/posts/:id/vote
```

**Authentication Required**

**URL Parameters:**
- `id`: integer (required)

**Request Body:**
```json
{
  "value": "integer"
}
```
Note: `value` must be either 1 (upvote) or -1 (downvote).

**Response:**
```json
{
  "points": "integer"
}
```

---

## Comment Endpoints

### Get Comments for a Post

```
GET /api/comments/post/:postId
```

**URL Parameters:**
- `postId`: integer (required)

**Response:**
```json
[
  {
    "id": "integer",
    "text": "string",
    "createdAt": "datetime",
    "author": {
      "id": "integer",
      "name": "string"
    },
    "children": [
      {
        "id": "integer",
        "text": "string",
        "createdAt": "datetime",
        "author": {
          "id": "integer",
          "name": "string"
        }
      }
    ]
  }
]
```

### Get Replies for a Comment

```
GET /api/comments/:commentId/replies
```

**URL Parameters:**
- `commentId`: integer (required)

**Response:**
```json
[
  {
    "id": "integer",
    "text": "string",
    "createdAt": "datetime",
    "author": {
      "id": "integer",
      "name": "string"
    },
    "children": [
      {
        "id": "integer",
        "text": "string",
        "createdAt": "datetime",
        "author": {
          "id": "integer",
          "name": "string"
        }
      }
    ]
  }
]
```

### Create a Comment

```
POST /api/comments
```

**Authentication Required**

**Request Body:**
```json
{
  "postId": "integer",
  "text": "string",
  "parentId": "integer | null"
}
```
Note: `parentId` is optional and is used for replying to another comment.

**Response:**
```json
{
  "id": "integer",
  "text": "string",
  "postId": "integer",
  "authorId": "integer",
  "parentId": "integer | null",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "author": {
    "id": "integer",
    "name": "string"
  }
}
```

### Update a Comment

```
PUT /api/comments/:id
```

**Authentication Required**

**URL Parameters:**
- `id`: integer (required)

**Request Body:**
```json
{
  "text": "string"
}
```

**Response:**
```json
{
  "id": "integer",
  "text": "string",
  "postId": "integer",
  "authorId": "integer",
  "parentId": "integer | null",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "author": {
    "id": "integer",
    "name": "string"
  }
}
```

### Delete a Comment

```
DELETE /api/comments/:id
```

**Authentication Required**

**URL Parameters:**
- `id`: integer (required)

**Response:**
```json
{
  "message": "Comment deleted successfully"
}
```
