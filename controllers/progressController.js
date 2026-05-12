const UserProgress = require('../models/UserProgress');
const User = require('../models/User');

const updateProgress = async (req, res) => {
  const { lessonId, quizId, challengeId, xpEarned } = req.body;
  const userId = req.user._id;

  try {
    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
      progress = await UserProgress.create({ userId });
    }

    let isNew = false;

    if (lessonId && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      isNew = true;
    }
    if (quizId && !progress.completedQuizzes.includes(quizId)) {
      progress.completedQuizzes.push(quizId);
      isNew = true;
    }
    if (challengeId && !progress.completedChallenges.includes(challengeId)) {
      progress.completedChallenges.push(challengeId);
      isNew = true;
    }

    if (isNew && xpEarned) {
      progress.xp += xpEarned;
    }

    // Streak Calculation
    const today = new Date().setHours(0, 0, 0, 0);
    const lastDate = new Date(progress.lastActivity).setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      progress.streak += 1;
    } else if (diffDays > 1 || progress.streak === 0) {
      progress.streak = 1;
    }

    progress.lastActivity = Date.now();
    await progress.save();

    // Sync with User model (Only if it's not the hardcoded admin)
    if (userId !== 'admin_id_001') {
      await User.findByIdAndUpdate(userId, { 
        $set: { 
          xp: progress.xp,
          streak: progress.streak 
        }
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgress = async (req, res) => {
  try {
    // Handle hardcoded System Admin
    if (req.user._id === 'admin_id_001') {
      return res.json({
        userId: 'admin_id_001',
        completedLessons: [],
        completedQuizzes: [],
        completedChallenges: [],
        xp: 99999,
        streak: 0
      });
    }

    const progress = await UserProgress.findOne({ userId: req.user._id });
    res.json(progress);
  } catch (error) {
    console.error('Get Progress Error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProgress, getProgress };
