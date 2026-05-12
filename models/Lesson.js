const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  levelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  explanation: { type: String },
  examples: [{
    code: String,
    description: String,
    language: { type: String, default: 'javascript' }
  }],
  order: { type: Number, default: 0 },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  estimatedTime: { type: String },
  quiz: [{
    question: String,
    options: [String],
    correctAnswer: String
  }],
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }
});

module.exports = mongoose.model('Lesson', lessonSchema);
