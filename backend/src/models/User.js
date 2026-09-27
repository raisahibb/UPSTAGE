// Ye file User ka Mongoose schema aur model define karti hai.
// Is model ke through hum MongoDB mein users ko save aur read kar sakte hain.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,           // MongoDB level par duplicate emails block karna
    lowercase: true,        // Email hamesha lowercase mein store hogi
    trim: true,
  },
  // Password hashed form mein store hoga — plain text kabhi nahi
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  // Normal signup mein role hamesha 'candidate' hoga
  // Admin role backend se manually assign hoga
  role: {
    type: String,
    enum: ['candidate', 'admin'],
    default: 'candidate',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
