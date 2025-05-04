# Hacker News Clone

A full-stack Hacker News clone with user authentication, post management, commenting, and search functionality.

## Features

- **User Authentication**
  - Sign up, log in, and log out
  - Secure password storage with bcrypt
  - JWT-based authentication

- **Post Feed**
  - Paginated post list
  - Display title, URL/text, author, points, and comment count
  - Upvote functionality

- **Submission**
  - Authenticated users can submit new posts (URL or text-based)
  - Edit and delete own posts

- **Comments**
  - Threaded comments with nested replies
  - Users can add, edit, and delete their own comments

- **Sorting & Search**
  - Sort by "new," "top," and "best"
  - Search posts by title or content

- **Responsive UI**
  - Mobile-friendly design
  - Clean and intuitive interface

## Technology Stack

### Backend
- **Node.js** with Express.js framework
- **PostgreSQL** database
- **Prisma ORM** for database management
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend
- **React** library
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API requests

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Backend
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/hackernews?schema=public"
FRONTEND_URL="http://localhost:3000"
JWT_SECRET="your_secret_key"

# Frontend
REACT_APP_BASE_URL="http://localhost:5000/api"
```

Replace `username` and `password` with your PostgreSQL credentials.

### Backend Setup

1. Clone the repository:
   ```
   git clone [your-repo-url]
   cd hacker-news-clone/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   ```
   npx prisma migrate dev
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The backend server will run on http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend application will run on http://localhost:3000.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/user/:id` - Get user details

### Posts
- `GET /api/posts` - Get all posts (with pagination and sorting)
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post (requires authentication)
- `PUT /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)
- `POST /api/posts/:id/vote` - Upvote a post (requires authentication)
- `POST /api/posts/:id/check-vote` - CHeck if the logged in user has already voted
- `GET /api/posts/search` - Search for posts

### Comments
- `GET /api/comments/post/:postId` - Get all comments for a post
- `GET /api/comments/:commentId/replies` - Get all replies for a comment
- `POST /api/comments` - Create a new comment (requires authentication)
- `PUT /api/comments/:id` - Update a comment (requires authentication)
- `DELETE /api/comments/:id` - Delete a comment (requires authentication)

## AI Tools Used

During the development of this project, I leveraged several AI tools that significantly enhanced my productivity and code quality:

### ChatGPT
- Assisted with debugging issues
- Provided guidance on best practices for JWT implementation
- Helped architect the comment threading system

### Cursor
- Used for intelligent code navigation and refactoring
- Helped with writing repetitive code patterns, especially for CRUD operations
- Helped in making reusable React component structures and styling with Tailwind CSS
- Improved code organization through AI-assisted restructuring
- Helped in writing API Documentation, Readme file and comments in the code.

### AI Contribution to Development

These AI tools played a crucial role in speeding up the development process and improving the quality of the codebase:

1. **Accelerated Development**: Reduced time spent on boilerplate code, allowing more focus on core features and business logic.

2. **Better Code Quality**: AI suggestions often followed best practices and helped identify potential bugs or edge cases.

3. **Learning Opportunity**: AI tools provided insights into modern development patterns and techniques, enhancing my skills.

4. **Problem Solving**: When faced with challenging implementation details (like nested comments or authentication flow), AI tools offered multiple solution approaches to consider.

## Code Structure

The project follows a clean, maintainable structure:

```
hacker-news-clone/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Authentication and error handlers
│   ├── models/           # Prisma schema and model definitions
│   ├── routes/           # API route definitions
│   ├── utils/            # Helper functions
│   └── server.js         # Entry point
│
├── frontend/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── contexts/     # React contexts (auth, etc.)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service functions
│   │   ├── utils/        # Helper functions
│   │   ├── App.js        # Main component
│   │   └── index.js      # Entry point
```