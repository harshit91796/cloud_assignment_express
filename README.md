# Auth Joke API

This project is a RESTful API built with Node.js that provides user authentication and retrieves random Chuck Norris jokes.

## Features

- User registration and login
- JWT-based authentication
- Profile viewing for authenticated users
- Fetching random Chuck Norris jokes
- Input validation using Joi

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/auth-joke-api.git
   cd auth-joke-api
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/auth-joke-api
   JWT_SECRET=your_jwt_secret_key
   ```

## Usage

To start the server in development mode:
