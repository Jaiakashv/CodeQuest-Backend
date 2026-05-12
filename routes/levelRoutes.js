const express = require('express');
const { getLevelsByTopic, createLevel, updateLevel, deleteLevel } = require('../controllers/levelController');
const { protect, admin } = require('../middleware/authMiddleware');
const { cacheMiddleware, clearCache } = require('../middleware/cacheMiddleware');

const router = express.Router();

router.get('/:topicId', cacheMiddleware(300), getLevelsByTopic);
router.post('/', protect, admin, (req, res, next) => { clearCache('/api/levels'); next(); }, createLevel);
router.put('/:id', protect, admin, (req, res, next) => { clearCache('/api/levels'); next(); }, updateLevel);
router.delete('/:id', protect, admin, (req, res, next) => { clearCache('/api/levels'); next(); }, deleteLevel);

module.exports = router;
