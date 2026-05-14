const express = require('express');
const router = express.Router();
const { getAllProblems, getProblemsByLanguage, getProblemById, createProblem } = require('../controllers/problemController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getAllProblems);
router.get('/language/:language', getProblemsByLanguage);
router.get('/:id', getProblemById);
router.post('/', protect, admin, createProblem);

module.exports = router;
