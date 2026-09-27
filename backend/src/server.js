const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const questionRoutes = require('./routes/questionRoutes');
const responseRoutes = require('./routes/responseRoutes');
const aiRoutes = require('./routes/aiRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

// Express app create kar rahe hain
const app = express();

// Middlewares setup kar rahe hain
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
};
app.use(cors(corsOptions));

// Ye allow karega JSON data read karna request body se
app.use(express.json());

// Routes ko configure kar rahe hain
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/interviews/:interviewId/questions', questionRoutes);
app.use('/api/interviews/:interviewId/responses', responseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middlewares ko configure kar rahe hain
// Agar koi valid route nahi milta, toh notFoundHandler chalega
app.use(notFoundHandler);

// Agar koi unhandled error aata hai code mein, toh globalErrorHandler chalega
app.use(globalErrorHandler);

// Pehle MongoDB se connect karo, uske baad hi server start karo
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UPSTAGE backend running on port ${PORT}`);
  });
};

startServer();
