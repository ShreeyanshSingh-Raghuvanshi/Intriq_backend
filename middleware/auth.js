const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains { id: "..." }
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

exports.checkPremium = async (req, res, next) => {
  try {
    // FIXED: Use req.user.id (not req.userId)
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);
    
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    
    // Check if user is premium
    if (!user.isPremium) {
        return res.status(403).json({ message: "Premium subscription required" });
    }
    
    next();
  } catch (error) {
    console.error("Premium Check Error:", error);
    res.status(500).json({ error: "Server error checking premium status" });
  }
};
