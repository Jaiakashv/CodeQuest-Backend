const express = require('express');
const { getLessonsByLevel, getLessonBySlug, createLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const { protect, admin } = require('../middleware/authMiddleware');
const { cacheMiddleware, clearCache } = require('../middleware/cacheMiddleware');

const router = express.Router();

router.get('/level/:levelId', cacheMiddleware(300), getLessonsByLevel);
router.get('/:slug', cacheMiddleware(300), getLessonBySlug);
router.post('/', protect, admin, (req, res, next) => { clearCache('/api/lessons'); next(); }, createLesson);
router.put('/:id', protect, admin, (req, res, next) => { clearCache('/api/lessons'); next(); }, updateLesson);
router.delete('/:id', protect, admin, (req, res, next) => { clearCache('/api/lessons'); next(); }, deleteLesson);

module.exports = router;
