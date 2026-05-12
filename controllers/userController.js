const User = require('../models/User');

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .select('name xp streak avatar badges')
      .sort({ xp: -1 })
      .limit(20);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeaderboard };
