const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  title: { type: String, required: true },
  instructions: { type: String, required: true },
  starterCode: { type: String },
  expectedOutput: { type: String },
  hiddenTests: [{
    input: String,
    output: String,
    regex: String
  }],
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] }
});

module.exports = mongoose.model('Challenge', challengeSchema);
