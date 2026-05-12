const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  type: { type: String, enum: ['mcq', 'true-false', 'fill-blank'], default: 'mcq' }
});

module.exports = mongoose.model('Quiz', quizSchema);
