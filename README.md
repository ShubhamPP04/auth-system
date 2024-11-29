# Authentication System

A modern authentication system built with React.js and Node.js, featuring a beautiful and responsive UI.

## Features

- User Registration
- User Login
- JWT Authentication
- Responsive Design
- Form Validation
- Secure Password Handling

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Bcrypt

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/ShubhamPP04/auth-system.git
cd auth-system
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# In backend/.env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5001
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=10
```

4. Run the application
```bash
# Run backend (from backend directory)
npm start

# Run frontend (from frontend directory)
npm start
```

## Screenshots

- Login Page
- Signup Page

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) 