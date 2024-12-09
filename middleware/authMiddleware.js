const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check user role(s)
const checkRole = (...roles) => {
  return async (req, res, next) => {
    // Get the token from the authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    // If no token is provided, return an error
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Decode the token and extract the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find the user by ID from the database
      const user = await User.findById(decoded.userId);
      
      // If the user is not found, return an error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // If the user's role is not in the list of allowed roles, return an error
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: `Access denied. You need to be a ${roles.join(' or ')} to perform this action.` });
      }

      // Attach the user to the request object for use in the next middleware/controller
      req.user = user;

      // Continue to the next middleware/controller
      next();
    } catch (error) {
      // If there is an error, return a server error response
      res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = checkRole;
