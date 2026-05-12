const express = require('express');
const { getLeaderboard } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { cacheMiddleware } = require('../middleware/cacheMiddleware');

const router = express.Router();

// Publicly accessible but cached for performance
router.get('/leaderboard', cacheMiddleware(300), getLeaderboard);

module.exports = router;
