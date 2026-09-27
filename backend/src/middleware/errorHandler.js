// Ye middleware unknown routes handle karne ke liye hai (404 Not Found)
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
};

// Ye global error handler hai jo kisi bhi unhandled error ko catch karega
const globalErrorHandler = (err, req, res, next) => {
  console.error("Error aaya hai:", err);
  
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
