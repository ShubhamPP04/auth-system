const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for input validation
const validateInput = (req, res, next) => {
  const { fullName, email, dateOfBirth, phoneNumber, password } = req.body;

  // Basic validation
  if (!fullName || !email || !dateOfBirth || !phoneNumber || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Phone number validation
  const phoneRegex = /^\+\d{1,3}\s\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  // Password validation
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  // Date validation
  const birthDate = new Date(dateOfBirth);
  if (isNaN(birthDate.getTime()) || birthDate > new Date()) {
    return res.status(400).json({ error: 'Invalid date of birth' });
  }

  next();
};

// Register route
router.post('/register', validateInput, async (req, res) => {
  try {
    const { fullName, email, dateOfBirth, phoneNumber, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      dateOfBirth,
      phoneNumber,
      password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toPublicJSON()
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: Object.values(error.errors)[0].message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: user.toPublicJSON()
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user profile route (protected)
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.toPublicJSON());
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 