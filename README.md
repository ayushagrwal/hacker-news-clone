# Hacker News Clone - Backend

This is the backend for a Hacker News clone built with Express.js, Prisma ORM, and PostgreSQL.

## Features

- **User Authentication**
  - Sign up, log in, and log out
  - Secure password storage with bcrypt
  - JWT-based authentication

- **Post Management**
  - Create, read, update, and delete posts
  - Pagination and sorting options (new, top, best)
  - Upvote/downvote functionality

- **Comments**
  - Threaded comments with replies
  - Create, read, update, and delete comments
  - Comment replies and nesting

- **Search**
  - Search posts by title or content

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (version 13 or higher)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3001
DATABASE_URL="postgresql://username:password@localhost:5432/hackernews?schema=public"
FRONTEND_URL="http://localhost:3000"
JWT_SECRET="your_secret_key"
```

Replace `username` and `password` with your PostgreSQL credentials.

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Set up the database:
   ```
   npx prisma migrate dev
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Posts
- `GET /api/posts` - Get all posts (with pagination and sorting)
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post (requires authentication)
- `PUT /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)
- `POST /api/posts/:id/vote` - Upvote or downvote a post (requires authentication)
- `GET /api/posts/search` - Search for posts

### Comments
- `GET /api/comments/post/:postId` - Get all comments for a post
- `GET /api/comments/:commentId/replies` - Get all replies for a comment
- `POST /api/comments` - Create a new comment (requires authentication)
- `PUT /api/comments/:id` - Update a comment (requires authentication)
- `DELETE /api/comments/:id` - Delete a comment (requires authentication)

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JSON Web Tokens
- bcryptjs for password hashing 