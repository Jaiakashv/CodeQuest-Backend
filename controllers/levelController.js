const Level = require('../models/Level');

const getLevelsByTopic = async (req, res) => {
  try {
    const levels = await Level.find({ topicId: req.params.topicId }).sort('order');
    res.json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLevel = async (req, res) => {
  const { topicId, title, type, order } = req.body;
  try {
    const level = await Level.create({ topicId, title, type, order });
    res.status(201).json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLevel = async (req, res) => {
  try {
    const level = await Level.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLevel = async (req, res) => {
  try {
    await Level.findByIdAndDelete(req.params.id);
    res.json({ message: 'Level deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLevelsByTopic, createLevel, updateLevel, deleteLevel };
