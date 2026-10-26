import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/profile - Fetch profile, XP, and rewarded task IDs
router.get('/', (req, res) => {
  try {
    const data = db.getProfile();
    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
      error: error.message
    });
  }
});

// PUT /api/profile - Update profile details
router.put('/', (req, res) => {
  try {
    const updated = db.updateProfile(req.body);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// POST /api/profile/xp - Award XP to user
router.post('/xp', (req, res) => {
  try {
    const { amount, taskId } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid XP amount is required'
      });
    }

    const result = db.addXp(amount, taskId);
    res.json({
      success: true,
      message: `Earned +${amount} XP!`,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to award XP',
      error: error.message
    });
  }
});

export default router;
