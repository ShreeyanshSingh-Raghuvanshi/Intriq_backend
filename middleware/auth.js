const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attaches user ID to request
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

exports.checkPremium = async (req, res, next) => {
  const User = require('../models/User');
  const user = await User.findById(req.userId);
  if (!user.isPremium) return res.status(403).json({ message: "Premium subscription required" });
  next();
};