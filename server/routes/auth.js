import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// Middleware to extract token
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : req.headers['x-auth-token'];

  if (token) {
    const user = db.getUserByToken(token);
    if (user) {
      req.user = user;
      req.token = token;
    }
  }
  next();
}

// POST /api/auth/register
router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const authData = db.registerUser({ name, email, password });
    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: authData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const authData = db.loginUser({ email, password });
    res.json({
      success: true,
      message: 'Logged in successfully',
      data: authData
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated or session expired'
    });
  }

  res.json({
    success: true,
    data: req.user
  });
});

export default router;
