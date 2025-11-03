# User Login Backend

This project is a simple backend application for handling user login details using Node.js, Express, and MongoDB. It provides an API for user authentication and manages user credentials securely.

## Project Structure

```
user-login-backend
├── src
│   ├── config
│   │   └── database.js        # Database connection logic
│   ├── controllers
│   │   └── userController.js   # User authentication logic
│   ├── models
│   │   └── user.js             # User model schema
│   ├── routes
│   │   └── userRoutes.js       # User-related routes
│   └── server.js               # Entry point of the application
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd user-login-backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Ensure that MongoDB is running on your local machine.

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:5000`.

## API Endpoints

- **POST /api/users/login**: Authenticate a user with username and password.

## License

This project is licensed under the MIT License.