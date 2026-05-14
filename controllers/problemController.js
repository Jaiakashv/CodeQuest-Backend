const Problem = require('../models/Problem');

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort('-createdAt');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProblemsByLanguage = async (req, res) => {
  try {
    const problems = await Problem.find({ language: req.params.language.toLowerCase() }).sort('-createdAt');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (problem) {
      res.json(problem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProblem = async (req, res) => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllProblems, getProblemsByLanguage, getProblemById, createProblem };
