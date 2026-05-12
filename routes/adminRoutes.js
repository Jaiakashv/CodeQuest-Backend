const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { clearCache } = require('../middleware/cacheMiddleware');
const { createTopic, updateTopic, deleteTopic } = require('../controllers/topicController');
const { createLevel, updateLevel, deleteLevel } = require('../controllers/levelController');
const { createLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const { createQuiz, updateQuiz, deleteQuiz } = require('../controllers/quizController');
const { createChallenge, updateChallenge, deleteChallenge } = require('../controllers/challengeController');

const router = express.Router();

// All routes are protected and admin only
router.use(protect, admin);

// Cache clearing middleware for admin actions
const clearAllCaches = (req, res, next) => {
  clearCache('/api/topics');
  clearCache('/api/lessons');
  next();
};

router.use(clearAllCaches);

// Topics
router.post('/topics', createTopic);
router.put('/topics/:id', updateTopic);
router.delete('/topics/:id', deleteTopic);

// Levels
router.post('/levels', createLevel);
router.put('/levels/:id', updateLevel);
router.delete('/levels/:id', deleteLevel);

// Lessons
router.post('/lessons', createLesson);
router.put('/lessons/:id', updateLesson);
router.delete('/lessons/:id', deleteLesson);

// Quizzes
router.post('/quizzes', createQuiz);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);

// Challenges
router.post('/challenges', createChallenge);
router.put('/challenges/:id', updateChallenge);
router.delete('/challenges/:id', deleteChallenge);

module.exports = router;
