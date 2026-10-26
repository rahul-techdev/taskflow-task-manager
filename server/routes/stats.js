import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/stats - Dashboard analytics and counts
router.get('/', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats',
      error: error.message
    });
  }
});

export default router;
