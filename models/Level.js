const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  title: { type: String, required: true },
  type: { type: String }, // e.g., 'Basics', 'Intermediate', 'Advanced'
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Level', levelSchema);
