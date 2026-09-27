// Ye function backend ki health check karne ke liye use hota hai
// Isse hum verify kar sakte hain ki humara server properly chal raha hai ya nahi.
const checkHealth = (req, res) => {
  res.json({
    success: true,
    message: "UPSTAGE backend is running"
  });
};

module.exports = {
  checkHealth
};
