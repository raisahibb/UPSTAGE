// Ye file authentication ke saare API functions handle karti hai.
// Signup, Login, aur getCurrentUser — teen main functions hain.
// Users ab MongoDB mein permanently store hote hain.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// -------------------------------------------------------------------
// Helper: JWT token banana
// -------------------------------------------------------------------
const createToken = (userId, role) => {
  // Token mein sirf id aur role daalna hai — password nahi
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// -------------------------------------------------------------------
// Helper: Basic email format check
// -------------------------------------------------------------------
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// -------------------------------------------------------------------
// POST /api/auth/signup
// -------------------------------------------------------------------
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // MongoDB mein check karo — kya is email se pehle se account hai?
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Password ko direct save nahi karna hai,
    // isliye pehle bcrypt se hash kar rahe hain.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Naya User document banana aur MongoDB mein save karna
    // Role hamesha 'candidate' hoga — admin role form se nahi milta
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'candidate',
    });

    // Token create karo aur return karo
    const token = createToken(newUser._id, newUser.role);

    // Password kabhi response mein nahi bhejna
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup failed. Please try again.' });
  }
};

// -------------------------------------------------------------------
// POST /api/auth/login
// -------------------------------------------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // MongoDB mein email se user dhundna
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Security ke liye vague message — koi specific info nahi dena
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({
        success: false,
        message: 'Your account is inactive. Please contact an administrator.',
      });
    }

    // Entered password ko stored hash se compare karna
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Credentials sahi hain — token banao
    const token = createToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
  }
};

// -------------------------------------------------------------------
// GET /api/auth/me  (Protected route — authMiddleware pehle chalega)
// -------------------------------------------------------------------
const getCurrentUser = async (req, res) => {
  try {
    // req.user.id authMiddleware ne JWT se nikaal ke attach kiya hai
    // .select('-password') se password field response mein nahi aayega
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('getCurrentUser error:', error);
    res.status(500).json({ success: false, message: 'Could not fetch user information.' });
  }
};

module.exports = { signup, login, getCurrentUser };
