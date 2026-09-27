// Ye middleware role-based access control ke liye hai.
// Example: requireRole('admin') use karne se sirf admin users access kar sakte hain.

const requireRole = (role) => {
  return (req, res, next) => {
    // protect middleware pehle chalna chahiye, jo req.user set karta hai
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not have permission for this action.',
      });
    }

    next();
  };
};

module.exports = { requireRole };
