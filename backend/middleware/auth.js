import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to protect routes by verifying JWT token
 * Attaches user to req.user if token is valid
 */
export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Not authorized, no token provided',
      });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized, no token provided',
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (excluding password)
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return res.status(401).json({
          message: 'User not found',
        });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Not authorized, invalid token',
      });
    }
  } catch (error) {
    next(error);
  }
};

