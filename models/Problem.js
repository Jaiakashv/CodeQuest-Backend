const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, enum: ['javascript', 'python', 'java'], required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  category: { type: String, default: 'General' }, // e.g., 'Array', 'String', 'Tree'
  starterCode: { type: String },
  solutionCode: { type: String },
  testCases: [{
    input: String,
    expectedOutput: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', problemSchema);
