const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');
const Level = require('../models/Level');
const Lesson = require('../models/Lesson');
const Challenge = require('../models/Challenge');

const seedAdvancedJS = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB...');

    const jsTopic = await Topic.findOne({ slug: 'javascript-basics' });
    if (!jsTopic) {
      console.error('JS Topic not found.');
      process.exit(1);
    }

    // Clean up existing levels and lessons for JS topic to avoid duplicates
    const levels = await Level.find({ topicId: jsTopic._id });
    const levelIds = levels.map(l => l._id);
    await Lesson.deleteMany({ levelId: { $in: levelIds } });
    await Challenge.deleteMany({ topicId: jsTopic._id });
    await Level.deleteMany({ topicId: jsTopic._id });

    console.log('Cleaned up existing JS content...');

    // Helper function to create Lesson + Challenge
    const createLessonWithChallenge = async (data, challengeData) => {
      const lesson = await Lesson.create(data);
      if (challengeData) {
        const challenge = await Challenge.create({
          ...challengeData,
          topicId: jsTopic._id,
          lessonId: lesson._id
        });
        lesson.challenge = challenge._id;
        await lesson.save();
      }
      return lesson;
    };

    // --- LEVEL 1: THE BEGINNING (Re-seeding basic ones with details) ---
    const level1 = await Level.create({
      topicId: jsTopic._id,
      title: 'The Beginning',
      type: 'Basics',
      order: 1
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level1._id,
      title: 'Variables & Constants',
      slug: 'js-variables',
      description: 'Storage for your data.',
      explanation: `
### Definition
Variables are containers for storing data values.

### Syntax
\`\`\`javascript
let name = "John"; // Reassignable
const age = 30;    // Constant (cannot be changed)
var old = true;    // Legacy way (avoid)
\`\`\`

### Real Example
Think of a variable as a box with a label. You can put things in it and change them later (let) or lock the box forever (const).
      `,
      order: 1,
      difficulty: 'Beginner',
      estimatedTime: '10 mins',
      quiz: [
        {
          question: 'Which keyword prevents reassignment?',
          options: ['let', 'var', 'const', 'set'],
          correctAnswer: 'const'
        }
      ]
    }, {
      title: 'Constant Challenge',
      instructions: 'Declare a constant named VERSION and set it to 1.2. Log it.',
      starterCode: '// Your code here\n',
      expectedOutput: '1.2',
      difficulty: 'Beginner'
    });

    // --- LEVEL 2: OPERATORS & CONTROL FLOW ---
    const level2 = await Level.create({
      topicId: jsTopic._id,
      title: 'Logic & Control Flow',
      type: 'Logic',
      order: 2
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level2._id,
      title: 'Operators',
      slug: 'js-operators',
      description: 'Arithmetic and comparison logic.',
      explanation: `
### Definition
Operators perform operations on variables and values.

### Syntax
- Arithmetic: \`+, -, *, /, %, **\`
- Comparison: \`==, ===, !=, !==, >, <, >=, <=\`
- Logical: \`&& (AND), || (OR), ! (NOT)\`

### Real Example
Checking if a user is old enough to enter:
\`\`\`javascript
const age = 18;
const isAdult = age >= 18; // Returns true
\`\`\`
      `,
      order: 1,
      difficulty: 'Beginner',
      estimatedTime: '15 mins',
      quiz: [
        {
          question: 'What does === check that == does not?',
          options: ['Value', 'Type', 'Both', 'Nothing'],
          correctAnswer: 'Type'
        }
      ]
    }, {
      title: 'Modulo Challenge',
      instructions: 'Find the remainder of 10 divided by 3 using the modulo operator and log it.',
      starterCode: 'const result = \nconsole.log(result);',
      expectedOutput: '1',
      difficulty: 'Beginner'
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level2._id,
      title: 'Conditionals',
      slug: 'js-conditionals',
      description: 'Making decisions with code.',
      explanation: `
### Definition
Conditionals execute code blocks based on whether a condition is true or false.

### Syntax
\`\`\`javascript
if (condition) {
  // code if true
} else if (anotherCondition) {
  // code
} else {
  // default code
}
\`\`\`

### Real Example
Greeting based on time of day:
\`\`\`javascript
if (hour < 12) {
  greeting = "Good morning";
} else {
  greeting = "Good day";
}
\`\`\`
      `,
      order: 2,
      difficulty: 'Beginner',
      estimatedTime: '20 mins',
      quiz: [{ question: 'Which statement handles multiple cases?', options: ['if', 'else', 'switch'], correctAnswer: 'switch' }]
    }, {
      title: 'Positive Check',
      instructions: 'Write an if statement that logs "Positive" if num is greater than 0.',
      starterCode: 'const num = 5;\nif (num > 0) {\n  // log here\n}',
      expectedOutput: 'Positive',
      difficulty: 'Beginner'
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level2._id,
      title: 'Loops',
      slug: 'js-loops',
      description: 'Repeat tasks efficiently.',
      explanation: `
### Definition
Loops repeat a block of code while a condition is met.

### Syntax
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

### Real Example
Printing a list of products in a shopping cart.
      `,
      order: 3,
      difficulty: 'Beginner',
      estimatedTime: '20 mins'
    }, {
      title: 'Simple Loop',
      instructions: 'Use a for loop to log the numbers 1 and 2.',
      starterCode: 'for (let i = 1; i <= 2; i++) {\n  console.log(i);\n}',
      expectedOutput: '1\n2',
      difficulty: 'Beginner'
    });

    // --- LEVEL 3: FUNCTIONS ---
    const level3 = await Level.create({
      topicId: jsTopic._id,
      title: 'Functions & Modern Syntax',
      type: 'Functions',
      order: 3
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level3._id,
      title: 'Functions',
      slug: 'js-functions',
      description: 'Reusable code blocks.',
      explanation: `
### Definition
A function is a block of code designed to perform a particular task.

### Syntax
\`\`\`javascript
function greet(name) {
  return "Hello " + name;
}
\`\`\`

### Real Example
A calculator function that adds two numbers.
      `,
      order: 1,
      difficulty: 'Beginner',
      estimatedTime: '20 mins'
    }, {
      title: 'Square Function',
      instructions: 'Define a function named square that takes x and returns x * x.',
      starterCode: 'function square(x) {\n  // return here\n}\nconsole.log(square(4));',
      expectedOutput: '16',
      difficulty: 'Beginner'
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level3._id,
      title: 'Arrow Functions',
      slug: 'js-arrow-functions',
      description: 'Clean, modern function syntax.',
      explanation: `
### Definition
Arrow functions provide a shorter syntax for writing functions.

### Syntax
\`\`\`javascript
const greet = (name) => \`Hello \${name}\`;
\`\`\`

### Real Example
Commonly used in array methods like map or filter.
      `,
      order: 2,
      difficulty: 'Beginner',
      estimatedTime: '15 mins'
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level3._id,
      title: 'Template Literals',
      slug: 'js-template-literals',
      description: 'Better string interpolation.',
      explanation: `
### Definition
Template literals use backticks (\` \`) and allow embedded expressions.

### Syntax
\`\`\`javascript
const str = \`Sum: \${5 + 5}\`;
\`\`\`

### Real Example
Dynamic HTML generation or complex messages.
      `,
      order: 3,
      difficulty: 'Beginner',
      estimatedTime: '10 mins'
    });

    // --- LEVEL 4: IMPORTANT CONCEPTS ---
    const level4 = await Level.create({
      topicId: jsTopic._id,
      title: 'Deep Dive: Core Concepts',
      type: 'Concepts',
      order: 4
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level4._id,
      title: 'Scope',
      slug: 'js-scope',
      description: 'Visibility of variables.',
      explanation: `
### Definition
Scope determines where variables are accessible.
- **Global**: Accessible everywhere.
- **Function**: Accessible only inside the function.
- **Block**: (let/const) Accessible only inside {}.

### Syntax
\`\`\`javascript
{
  let x = 10; // Block scoped
}
// console.log(x); // Error
\`\`\`
      `,
      order: 1,
      difficulty: 'Intermediate'
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level4._id,
      title: 'Closures',
      slug: 'js-closures',
      description: 'Functions remembering their origin.',
      explanation: `
### Definition
A closure is a function that remembers its lexical scope even when executed outside that scope.

### Syntax
\`\`\`javascript
function outer() {
  const msg = "Hi";
  return () => console.log(msg);
}
\`\`\`
      `,
      order: 2,
      difficulty: 'Intermediate'
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level4._id,
      title: 'The "this" Keyword',
      slug: 'js-this',
      description: 'Execution context explained.',
      explanation: `
### Definition
The 'this' keyword refers to the object currently executing the code.
- In a method: refers to the owner object.
- Alone: refers to the Global object.
      `,
      order: 3,
      difficulty: 'Intermediate'
    });

    // --- LEVEL 5: ASYNC JS ---
    const level5 = await Level.create({
      topicId: jsTopic._id,
      title: 'Asynchronous Programming',
      type: 'Async',
      order: 5
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level5._id,
      title: 'Promises',
      slug: 'js-promises',
      description: 'Handling future results.',
      explanation: `
### Definition
An object representing the eventual completion of an async task.

### Syntax
\`\`\`javascript
const myPromise = new Promise((resolve, reject) => { ... });
myPromise.then(res => ...).catch(err => ...);
\`\`\`
      `,
      order: 1,
      difficulty: 'Intermediate'
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level5._id,
      title: 'Async / Await',
      slug: 'js-async-await',
      description: 'Syntactic sugar for Promises.',
      explanation: `
### Definition
Async/Await allows you to write async code that looks synchronous.

### Syntax
\`\`\`javascript
async function getData() {
  const res = await fetch(url);
}
\`\`\`
      `,
      order: 2,
      difficulty: 'Intermediate'
    });

    // --- LEVEL 6: ARRAY METHODS ---
    const level6 = await Level.create({
      topicId: jsTopic._id,
      title: 'Array Power Methods',
      type: 'Arrays',
      order: 6
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level6._id,
      title: 'map() filter() reduce()',
      slug: 'js-array-methods',
      description: 'Powerful data manipulation.',
      explanation: `
### map()
Creates a new array by transforming every element.
\`\`\`javascript
[1, 2].map(x => x * 2); // [2, 4]
\`\`\`

### filter()
Filters elements based on a condition.
\`\`\`javascript
[1, 2].filter(x => x > 1); // [2]
\`\`\`
      `,
      order: 1,
      difficulty: 'Intermediate'
    }, {
      title: 'Map Challenge',
      instructions: 'Use .map() to double the numbers [1, 2, 3] and log the resulting array.',
      starterCode: 'const nums = [1, 2, 3];\nconst result = nums.map(n => n * 2);\nconsole.log(result);',
      expectedOutput: '[2,4,6]',
      difficulty: 'Intermediate'
    });

    // --- LEVEL 7: ES6 FEATURES ---
    const level7 = await Level.create({
      topicId: jsTopic._id,
      title: 'ES6 Features',
      type: 'Modern',
      order: 7
    });

    await createLessonWithChallenge({
      topicId: jsTopic._id,
      levelId: level7._id,
      title: 'Destructuring & Spread',
      slug: 'js-es6-plus',
      description: 'Clean data unpacking.',
      explanation: `
### Destructuring
\`\`\`javascript
const { name, age } = user;
\`\`\`

### Spread (...)
\`\`\`javascript
const newArr = [...oldArr, 4];
\`\`\`
      `,
      order: 1,
      difficulty: 'Intermediate'
    });

    console.log('Complete JS Curriculum Seeded Successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdvancedJS();
