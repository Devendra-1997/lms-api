# Library Management System (LMS) - API
This project is the backend of a Library Management System built using Node.js, Express, and MongoDB (hosted on MongoDB Atlas). It provides various API endpoints for managing users, books, reviews, burrow records, and user profiles.

## Features

- User authentication: : User login, signup, access token, refresh token generation.
- Book Management: CRUD operations for managing books in the system.
- Burrow System: APIs for burrowing and returning books.
- User Profiles: Managing and updating user profiles.
- Reviews: Adding, viewing, and managing reviews for books.


## Technologies Used

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- JWT for authentication
- Joi for validation
- Bcrypt for password encryption
-Nodemon for development

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js v14+ and npm (or Yarn)
- MongoDB Atlas account and cluster setup
- Render for backend deployment (optional)

## Installation

Follow the steps below to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Devendra-1997/lms-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd lms-api
   ```

3. Install the dependencies using Yarn:

   ```bash
   yarn install
   ```


4. Set up environment variables by creating a .env file in the root directory and include the following:

  

``` bash
 PORT=8000
 DB_CONNECT_URL=<your_mongo_atlas_url>
 ACCESS_TOKEN_SECRET=<your_access_token_secret>
 REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```

6. Start the development server:

   ```bash
   yarn dev
   ```

   Or in production mode:
   ```bash
   yarn start
   ```

## API Endpoints
**User Routes**
- POST /api/user: Create a new user (signup)
- POST /api/user/login: Login a user
- POST /api/user/logout: Logout a user
- GET /api/user: Get logged-in user's information (protected)
- GET /api/user/accessjwt: Get a new access token using the refresh token

**Book Routes**
- POST /api/book: Add a new book (admin only)
- GET /api/book: Get all books
- GET /api/book/:id: Get book by ID
- PUT /api/book/:id: Update a book (admin only)
- DELETE /api/book/:id: Delete a book (admin only)

  
**Book Routes**
- POST /api/burrow: Create a burrow record
- GET /api/burrow: Get all burrow records


**Profile Routes**
- PUT /api/user/profile: Update user profile (protected)

**Review Routes**
- POST /api/review: Add a review
- GET /api/review: Get all reviews

## Authentication

- Access token is required for protected routes.
- Refresh token can be used to get new access tokens when the old one expires.

## Middleware
- authMiddlewares.js: Handles user and admin authentication.
- joiValidations.js: Validates request bodies using Joi.
## Database Configuration
The app uses MongoDB Atlas. To connect, make sure you replace the DB_CONNECT_URL in your .env file with your MongoDB Atlas connection string.




**Deployment**:
The API can be deployed on Render for backend hosting. MongoDB Atlas is used for database hosting.

## License

This project is open-source and available under the MIT License.
