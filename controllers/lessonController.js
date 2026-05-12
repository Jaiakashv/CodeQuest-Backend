const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Challenge = require('../models/Challenge');

const getLessonsByLevel = async (req, res) => {
  try {
    const lessons = await Lesson.find({ levelId: req.params.levelId }).sort('order');
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLessonBySlug = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ slug: req.params.slug }).populate('challenge');
    if (lesson) {
      const lessonObj = lesson.toObject();
      
      // Backwards compatibility for quiz
      if (!lessonObj.quiz || lessonObj.quiz.length === 0) {
        lessonObj.quiz = await Quiz.find({ lessonId: lesson._id });
      }

      // Backwards compatibility for challenge
      if (!lessonObj.challenge) {
        lessonObj.challenge = await Challenge.findOne({ lessonId: lesson._id });
      }
      
      res.json(lessonObj);
    } else {
      res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    // Also delete associated quizzes and challenges
    await Quiz.deleteMany({ lessonId: req.params.id });
    await Challenge.deleteMany({ lessonId: req.params.id });
    res.json({ message: 'Lesson and associated data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLessonsByLevel, getLessonBySlug, createLesson, updateLesson, deleteLesson };
