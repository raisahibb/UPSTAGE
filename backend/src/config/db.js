// Ye file MongoDB se connection establish karti hai.
// Agar connection fail ho jaye toh backend start nahi karna chahiye,
// isliye process.exit(1) use kar rahe hain.

const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  // MONGO_URI honi chahiye .env mein — agar nahi hai toh seedha error
  if (!mongoURI) {
    console.error('Error: MONGO_URI is not defined in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    // URI ya password log nahi karna security ke liye
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
