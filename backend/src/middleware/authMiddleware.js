// Ye middleware protected routes ke liye JWT verify karta hai.
// Kisi bhi route ko protect karne ke liye yahan se import karo aur use karo.

const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  // Authorization header se token nikalna
  const authHeader = req.headers.authorization;

  // Header hona chahiye aur "Bearer <token>" format mein hona chahiye
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // DB se fresh user fetch karo taaki role changes reflect ho
    const User = require('../models/User');
    const dbUser = await User.findById(decoded.id).select('-password');
    
    if (!dbUser) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    
    if (dbUser.status === 'inactive') {
      return res.status(403).json({ success: false, message: 'Your account is inactive. Please contact an administrator.' });
    }
    
    req.user = dbUser;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.',
    });
  }
};

module.exports = { protect, adminOnly };
