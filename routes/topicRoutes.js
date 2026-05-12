const express = require('express');
const { getTopics, getTopicBySlug, createTopic, updateTopic, deleteTopic } = require('../controllers/topicController');
const { protect, admin } = require('../middleware/authMiddleware');
const { cacheMiddleware, clearCache } = require('../middleware/cacheMiddleware');

const router = express.Router();

router.get('/', cacheMiddleware(600), getTopics);
router.get('/:slug', cacheMiddleware(300), getTopicBySlug);
router.post('/', protect, admin, (req, res, next) => { clearCache('/api/topics'); next(); }, createTopic);
router.put('/:id', protect, admin, (req, res, next) => { clearCache('/api/topics'); next(); }, updateTopic);
router.delete('/:id', protect, admin, (req, res, next) => { clearCache('/api/topics'); next(); }, deleteTopic);

module.exports = router;
