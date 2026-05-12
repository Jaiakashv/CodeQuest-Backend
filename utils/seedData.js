const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');
const Level = require('../models/Level');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Challenge = require('../models/Challenge');

const topics = [
  {
    title: 'JavaScript Fundamentals',
    slug: 'javascript-basics',
    description: 'Learn the core concepts of JavaScript from variables to functions.',
    icon: 'JS',
    difficulty: 'Beginner',
    totalLessons: 3
  },
  {
    title: 'HTML & CSS Masterclass',
    slug: 'html-css',
    description: 'Build beautiful responsive websites from scratch.',
    icon: '🎨',
    difficulty: 'Beginner',
    totalLessons: 0
  },
  {
    title: 'React.js Deep Dive',
    slug: 'react-deep-dive',
    description: 'Master hooks, state management, and component architecture.',
    icon: '⚛️',
    difficulty: 'Intermediate',
    totalLessons: 0
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/codequest');
    console.log('Connected to DB for seeding...');

    // Clear existing data
    await Topic.deleteMany({});
    await Level.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});
    await Challenge.deleteMany({});

    // Seed Topics
    const createdTopics = await Topic.insertMany(topics);
    const jsTopic = createdTopics[0];

    // Seed Levels for JS
    const level1 = await Level.create({
      topicId: jsTopic._id,
      title: 'The Beginning',
      type: 'Basics',
      order: 1
    });

    // Seed Lesson 1
    const lesson1 = await Lesson.create({
      topicId: jsTopic._id,
      levelId: level1._id,
      title: 'Variables & Constants',
      slug: 'js-variables',
      description: 'Learn how to store data in JavaScript.',
      explanation: `In JavaScript, we use variables to store data values. 
      Before ES6, we used 'var'. Now we mostly use 'let' and 'const'.
      'let' allows you to reassign values, while 'const' is for constants that shouldn't change.`,
      examples: [
        { code: 'let name = "Alice";\nname = "Bob";', description: 'Using let for reassignable variables' },
        { code: 'const PI = 3.14;\n// PI = 3.15; // This will throw an error', description: 'Using const for constants' }
      ],
      order: 1,
      difficulty: 'Beginner',
      estimatedTime: '10 mins'
    });

    // Seed Quiz for Lesson 1
    await Quiz.create({
      lessonId: lesson1._id,
      question: 'Which keyword is used for variables that should NOT be reassigned?',
      options: ['let', 'var', 'const', 'set'],
      correctAnswer: 'const',
      type: 'mcq'
    });

    // Seed Challenge for Lesson 1
    await Challenge.create({
      lessonId: lesson1._id,
      title: 'Declare a Constant',
      instructions: 'Create a constant variable named "CITY" and assign it the string value "New York". Then log it to the console.',
      starterCode: '// Write your code below\n',
      expectedOutput: 'New York',
      difficulty: 'Beginner'
    });

    // Seed Lesson 2
    const lesson2 = await Lesson.create({
      topicId: jsTopic._id,
      levelId: level1._id,
      title: 'Data Types',
      slug: 'js-data-types',
      description: 'Understanding strings, numbers, booleans and more.',
      explanation: 'JavaScript has several primitive data types: String, Number, Boolean, Null, Undefined, and Symbol.',
      order: 2,
      difficulty: 'Beginner',
      estimatedTime: '15 mins'
    });

    await Challenge.create({
      lessonId: lesson2._id,
      title: 'Check Data Type',
      instructions: 'Use the "typeof" operator to find the type of the value 42. Log the result.',
      starterCode: 'const value = 42;\n// Your code here\n',
      expectedOutput: 'number',
      difficulty: 'Beginner'
    });

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
