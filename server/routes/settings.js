import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/settings - Fetch user settings
router.get('/', (req, res) => {
  try {
    const settings = db.getSettings();
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve settings',
      error: error.message
    });
  }
});

// PUT /api/settings - Update settings
router.put('/', (req, res) => {
  try {
    const updated = db.updateSettings(req.body);
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message
    });
  }
});

export default router;
