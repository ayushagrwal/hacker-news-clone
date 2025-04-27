# Hacker News Clone Backend

A RESTful API for a Hacker News clone built with Node.js, Express, and Prisma.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a .env file in the root directory with the following variables:
   ```
   PORT=5000
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. Run database migrations:
   ```
   npx prisma migrate dev
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login existing user


## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JSON Web Tokens
- bcryptjs for password hashing 