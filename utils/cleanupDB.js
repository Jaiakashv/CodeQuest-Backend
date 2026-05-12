const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Level = require('../models/Level');
const Lesson = require('../models/Lesson');

const cleanupEmptyLevels = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for cleanup...');

    const levels = await Level.find({});
    let removedCount = 0;

    for (const level of levels) {
      const lessonCount = await Lesson.countDocuments({ levelId: level._id });
      if (lessonCount === 0) {
        await Level.findByIdAndDelete(level._id);
        console.log(`Removed empty level: ${level.title} (Order: ${level.order})`);
        removedCount++;
      }
    }

    console.log(`Cleanup complete. Removed ${removedCount} empty levels.`);

    // Re-order remaining levels
    console.log('Re-ordering remaining levels...');
    const remainingLevels = await Level.find({}).sort('order');
    for (let i = 0; i < remainingLevels.length; i++) {
      remainingLevels[i].order = i + 1;
      await remainingLevels[i].save();
    }
    console.log('Re-ordering complete.');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

cleanupEmptyLevels();
