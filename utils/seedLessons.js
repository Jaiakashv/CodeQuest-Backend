const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');
const Level = require('../models/Level');
const Lesson = require('../models/Lesson');
const Challenge = require('../models/Challenge');

const seedFullCurriculum = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB...');

    const jsTopic = await Topic.findOne({ slug: 'javascript-basics' });
    if (!jsTopic) {
      console.error('JS Topic not found.');
      process.exit(1);
    }

    // Delete all existing data for JS topic
    const levels = await Level.find({ topicId: jsTopic._id });
    const levelIds = levels.map(l => l._id);
    await Lesson.deleteMany({ levelId: { $in: levelIds } });
    await Challenge.deleteMany({ topicId: jsTopic._id });
    await Level.deleteMany({ topicId: jsTopic._id });

    console.log('CLEARED ALL PREVIOUS DATA. Starting fresh seed...');

    const createLesson = async (lessonData, challengeData) => {
      const lesson = await Lesson.create(lessonData);
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

    // --- LEVEL 1: THE BASICS ---
    const lv1 = await Level.create({ topicId: jsTopic._id, title: 'The Basics', type: 'Basics', order: 1 });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv1._id,
      title: 'Variables (var, let, const)',
      slug: 'js-variables',
      explanation: `
### 1. Definition
Variables are containers for storing data values. In modern JS, we use let and const instead of var.

### 2. Syntax
\`\`\`javascript
const pi = 3.14;
let score = 0;
\`\`\`

### 3. Real Example
Storing a fixed user ID versus a changing score in a game.
`,
      order: 1,
      difficulty: 'Beginner',
      quiz: [{ question: 'Which keyword is used for constant values?', options: ['let', 'var', 'const'], correctAnswer: 'const' }]
    }, {
      title: 'Variable Challenge',
      instructions: 'Create a constant named NAME and set it to "Akash". Log it.',
      starterCode: '// Write your code here\n',
      expectedOutput: 'Akash'
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv1._id,
      title: 'Data Types',
      slug: 'js-data-types',
      explanation: `
### 1. Definition
Data types describe the different kinds of data that we can use in JavaScript like strings, numbers, and booleans.

### 2. Syntax
\`\`\`javascript
let str = "Hello";
let num = 42;
let bool = true;
\`\`\`

### 3. Real Example
Representing a product name, its price, and its availability status.
`,
      order: 2,
      difficulty: 'Beginner',
      quiz: [{ question: 'What type is the value 50?', options: ['string', 'number', 'boolean'], correctAnswer: 'number' }]
    }, {
      title: 'Type Challenge',
      instructions: 'Log the type of the value true using the typeof operator.',
      starterCode: '// Write your code here\n',
      expectedOutput: 'boolean'
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv1._id,
      title: 'Operators',
      slug: 'js-operators',
      explanation: `
### 1. Definition
Operators are used to perform operations on variables and values.

### 2. Syntax
\`\`\`javascript
let result = 10 + 5;
let check = (10 === 10);
\`\`\`

### 3. Real Example
Calculating discounts or checking if two passwords match.
`,
      order: 3,
      difficulty: 'Beginner',
      quiz: [{ question: 'Which operator checks for both value and type?', options: ['==', '===', '='], correctAnswer: '===' }]
    }, {
      title: 'Operator Challenge',
      instructions: 'Multiply 6 by 7 and log the result.',
      starterCode: '// Write your code here\n',
      expectedOutput: '42'
    });

    // --- LEVEL 2: CONTROL FLOW ---
    const lv2 = await Level.create({ topicId: jsTopic._id, title: 'Control Flow', type: 'Logic', order: 2 });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv2._id,
      title: 'Condition Statements',
      slug: 'js-conditionals',
      explanation: `
### 1. Definition
Conditional statements are used to perform different actions based on different conditions.

### 2. Syntax
\`\`\`javascript
if (age >= 18) {
  console.log("Adult");
}
\`\`\`

### 3. Real Example
Showing a login button if the user is logged out, or a logout button if they are logged in.
`,
      order: 1,
      difficulty: 'Beginner',
      quiz: [{ question: 'Which keyword handles the default case if no conditions are met?', options: ['if', 'else', 'switch'], correctAnswer: 'else' }]
    }, {
      title: 'Conditional Challenge',
      instructions: 'If 20 > 10, log "Larger".',
      starterCode: '// Write your code here\n',
      expectedOutput: 'Larger'
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv2._id,
      title: 'Loops',
      slug: 'js-loops',
      explanation: `
### 1. Definition
Loops are used to run the same code over and over again, each time with a different value.

### 2. Syntax
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
\`\`\`

### 3. Real Example
Iterating through a list of images to display them on a webpage.
`,
      order: 2,
      difficulty: 'Beginner',
      quiz: [{ question: 'Which loop is best when you know the number of iterations?', options: ['for', 'while', 'do-while'], correctAnswer: 'for' }]
    }, {
      title: 'Loop Challenge',
      instructions: 'Use a loop to log "Loop" exactly 2 times.',
      starterCode: '// Write your code here\n',
      expectedOutput: 'Loop\nLoop'
    });

    // --- LEVEL 3: FUNCTIONS ---
    const lv3 = await Level.create({ topicId: jsTopic._id, title: 'Modern Functions', type: 'Functions', order: 3 });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv3._id,
      title: 'Functions',
      slug: 'js-functions-basics',
      explanation: `
### 1. Definition
A function is a block of code designed to perform a particular task.

### 2. Syntax
\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

### 3. Real Example
A function that calculates the tax on an item price.
`,
      order: 1,
      difficulty: 'Beginner',
      quiz: [{ question: 'Which keyword is used to send a value back from a function?', options: ['send', 'return', 'give'], correctAnswer: 'return' }]
    }, {
      title: 'Function Challenge',
      instructions: 'Create a function named getX that returns 10. Log getX().',
      starterCode: '// Write your code here\n',
      expectedOutput: '10'
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv3._id,
      title: 'Arrow Functions',
      slug: 'js-arrow-functions',
      explanation: `
### 1. Definition
Arrow functions provide a shorter syntax for writing function expressions.

### 2. Syntax
\`\`\`javascript
const greet = () => "Hello";
\`\`\`

### 3. Real Example
Writing short, one-line functions for events or data processing.
`,
      order: 2,
      difficulty: 'Beginner',
      quiz: [{ question: 'Arrow functions are introduced in which version?', options: ['ES5', 'ES6', 'ES2020'], correctAnswer: 'ES6' }]
    }, {
      title: 'Arrow Challenge',
      instructions: 'Create an arrow function named double that takes n and returns n*2. Log double(5).',
      starterCode: '// Write your code here\n',
      expectedOutput: '10'
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv3._id,
      title: 'Template Literals',
      slug: 'js-template-literals',
      explanation: `
### 1. Definition
Template literals allow embedded expressions and multi-line strings using backticks.

### 2. Syntax
\`\`\`javascript
console.log(\`Hi \${name}\`);
\`\`\`

### 3. Real Example
Generating a personalized dynamic message for a user profile.
`,
      order: 3,
      difficulty: 'Beginner',
      quiz: [{ question: 'Which character is used for template literals?', options: ["'", '"', '`'], correctAnswer: '`' }]
    }, {
      title: 'Template Challenge',
      instructions: 'Log "Val: 100" using a variable x = 100 and template literals.',
      starterCode: '// Write your code here\n',
      expectedOutput: 'Val: 100'
    });

    // --- LEVEL 4: INTERVIEW CONCEPTS ---
    const lv4 = await Level.create({ topicId: jsTopic._id, title: 'Interview Essentials', type: 'Advanced', order: 4 });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv4._id,
      title: 'Scope (Global, Block, Function)',
      slug: 'js-scope',
      explanation: `
### 1. Definition
Scope determines the accessibility of variables. JS has Global, Function, and Block scope.

### 2. Syntax
\`\`\`javascript
{
  let x = 1; // Block scope
}
\`\`\`

### 3. Real Example
Preventing variable name collisions between different parts of a large application.
`,
      order: 1,
      difficulty: 'Intermediate',
      quiz: [{ question: 'Which keyword has block scope?', options: ['var', 'let', 'global'], correctAnswer: 'let' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv4._id,
      title: 'Closures',
      slug: 'js-closures',
      explanation: `
### 1. Definition
A closure is a function that remembers its outer variables even after the outer function has returned.

### 2. Syntax
\`\`\`javascript
function init() {
  let name = "JS";
  return () => name;
}
\`\`\`

### 3. Real Example
Creating data privacy where variables cannot be accessed from outside a specific function.
`,
      order: 2,
      difficulty: 'Intermediate',
      quiz: [{ question: 'Does a closure remember its lexical environment?', options: ['Yes', 'No'], correctAnswer: 'Yes' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv4._id,
      title: 'Hoisting',
      slug: 'js-hoisting',
      explanation: `
### 1. Definition
Hoisting is the behavior of moving declarations to the top of the current scope.

### 2. Syntax
\`\`\`javascript
console.log(x); // undefined
var x = 5;
\`\`\`

### 3. Real Example
Understanding why functions can be called before they are declared in the code.
`,
      order: 3,
      difficulty: 'Intermediate',
      quiz: [{ question: 'Are let and const hoisted?', options: ['No (Temporal Dead Zone)', 'Yes', 'Only const'], correctAnswer: 'No (Temporal Dead Zone)' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv4._id,
      title: 'this keyword',
      slug: 'js-this',
      explanation: `
### 1. Definition
The 'this' keyword refers to the object it belongs to, depending on how a function is called.

### 2. Syntax
\`\`\`javascript
const obj = {
  run() { console.log(this); }
};
\`\`\`

### 3. Real Example
In an event listener, 'this' refers to the element that received the event.
`,
      order: 4,
      difficulty: 'Intermediate',
      quiz: [{ question: 'In a regular function, what does this refer to?', options: ['Global object', 'The function', 'Nothing'], correctAnswer: 'Global object' }]
    });

    // --- LEVEL 5: ASYNC ---
    const lv5 = await Level.create({ topicId: jsTopic._id, title: 'Asynchronous JS', type: 'Async', order: 5 });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv5._id,
      title: 'Callback functions',
      slug: 'js-callbacks',
      explanation: `
### 1. Definition
A callback is a function passed as an argument to another function.

### 2. Syntax
\`\`\`javascript
function doWork(callback) {
  callback();
}
\`\`\`

### 3. Real Example
Running a piece of code only after a user clicks a button.
`,
      order: 1,
      difficulty: 'Intermediate',
      quiz: [{ question: 'Is a callback executed immediately or later?', options: ['Immediately', 'Later (When called)', 'Never'], correctAnswer: 'Later (When called)' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv5._id,
      title: 'Promises',
      slug: 'js-promises',
      explanation: `
### 1. Definition
A Promise represents the eventual completion or failure of an asynchronous operation.

### 2. Syntax
\`\`\`javascript
const p = new Promise((res) => res("Success"));
\`\`\`

### 3. Real Example
Waiting for data from a server before displaying it to the user.
`,
      order: 2,
      difficulty: 'Intermediate',
      quiz: [{ question: 'What are the 3 states of a Promise?', options: ['Start, Stop, End', 'Pending, Fulfilled, Rejected', 'Wait, Go, Finish'], correctAnswer: 'Pending, Fulfilled, Rejected' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv5._id,
      title: 'Async / Await',
      slug: 'js-async-await',
      explanation: `
### 1. Definition
Async/Await is syntactic sugar for promises, making async code look synchronous.

### 2. Syntax
\`\`\`javascript
async function getData() {
  const res = await fetch(url);
}
\`\`\`

### 3. Real Example
Cleaning up complex nested promise chains into readable steps.
`,
      order: 3,
      difficulty: 'Intermediate',
      quiz: [{ question: 'What does the await keyword do?', options: ['Stops execution', 'Waits for promise to resolve', 'Skips the line'], correctAnswer: 'Waits for promise to resolve' }]
    });

    // --- LEVEL 6: ARRAY METHODS ---
    const lv6 = await Level.create({ topicId: jsTopic._id, title: 'Master the Array', type: 'Arrays', order: 6 });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv6._id,
      title: 'map()',
      slug: 'js-map',
      explanation: `
### 1. Definition
Map creates a new array by performing a function on each array element.

### 2. Syntax
\`\`\`javascript
[1, 2].map(x => x * 2);
\`\`\`

### 3. Real Example
Converting a list of prices into a list of formatted price strings.
`,
      order: 1,
      difficulty: 'Intermediate',
      quiz: [{ question: 'Does map() change the original array?', options: ['Yes', 'No'], correctAnswer: 'No' }]
    }, {
      title: 'Map Challenge',
      instructions: 'Use map to triple [1, 2] and log result.',
      starterCode: '// Write your code here\n',
      expectedOutput: '[3,6]'
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv6._id,
      title: 'filter()',
      slug: 'js-filter',
      explanation: `
### 1. Definition
Filter creates a new array with elements that pass a specific test.

### 2. Syntax
\`\`\`javascript
[1, 10].filter(x => x > 5);
\`\`\`

### 3. Real Example
Filtering a product list to show only items currently in stock.
`,
      order: 2,
      difficulty: 'Intermediate',
      quiz: [{ question: 'What does filter() return if no items pass?', options: ['null', 'undefined', '[] (Empty array)'], correctAnswer: '[] (Empty array)' }]
    }, {
      title: 'Filter Challenge',
      instructions: 'Filter [5, 15, 25] to only keep numbers > 20 and log it.',
      starterCode: '// Write your code here\n',
      expectedOutput: '[25]'
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv6._id,
      title: 'reduce()',
      slug: 'js-reduce',
      explanation: `
### 1. Definition
Reduce runs a function on each array element to produce a single value.

### 2. Syntax
\`\`\`javascript
[1, 2].reduce((sum, n) => sum + n, 0);
\`\`\`

### 3. Real Example
Calculating the total price of all items in a shopping cart.
`,
      order: 3,
      difficulty: 'Intermediate',
      quiz: [{ question: 'What is the first argument of the reduce callback?', options: ['index', 'accumulator', 'currentValue'], correctAnswer: 'accumulator' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv6._id,
      title: 'forEach()',
      slug: 'js-foreach',
      explanation: `
### 1. Definition
ForEach calls a function once for each element in an array.

### 2. Syntax
\`\`\`javascript
[1, 2].forEach(x => console.log(x));
\`\`\`

### 3. Real Example
Sending an individual analytic event for every item a user viewed.
`,
      order: 4,
      difficulty: 'Intermediate',
      quiz: [{ question: 'Does forEach() return a new array?', options: ['Yes', 'No'], correctAnswer: 'No' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv6._id,
      title: 'find()',
      slug: 'js-find',
      explanation: `
### 1. Definition
Find returns the first element in an array that passes a test.

### 2. Syntax
\`\`\`javascript
[1, 5, 10].find(x => x > 4);
\`\`\`

### 3. Real Example
Finding a specific user object in an array based on their ID.
`,
      order: 5,
      difficulty: 'Intermediate',
      quiz: [{ question: 'How many items does find() return?', options: ['All matches', 'The first match only', 'An array'], correctAnswer: 'The first match only' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv6._id,
      title: 'some() & every()',
      slug: 'js-some-every',
      explanation: `
### 1. Definition
Some checks if any element passes a test. Every checks if all elements pass.

### 2. Syntax
\`\`\`javascript
[1, 2].some(x => x > 1);
[1, 2].every(x => x > 0);
\`\`\`

### 3. Real Example
Checking if 'every' user has accepted terms or 'some' items are fragile.
`,
      order: 6,
      difficulty: 'Intermediate',
      quiz: [{ question: 'What is the return type of some()?', options: ['Array', 'Boolean', 'Number'], correctAnswer: 'Boolean' }]
    });

    // --- LEVEL 7: ES6+ ---
    const lv7 = await Level.create({ topicId: jsTopic._id, title: 'ES6+ Power', type: 'Modern', order: 7 });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv7._id,
      title: 'Destructuring',
      slug: 'js-destructuring',
      explanation: `
### 1. Definition
Unpacking values from arrays or properties from objects into variables.

### 2. Syntax
\`\`\`javascript
const { name } = user;
\`\`\`

### 3. Real Example
Extracting specific settings from a large configuration object.
`,
      order: 1,
      difficulty: 'Intermediate',
      quiz: [{ question: 'Can you destructure arrays?', options: ['Yes', 'No'], correctAnswer: 'Yes' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv7._id,
      title: 'Spread & Rest operator',
      slug: 'js-spread-rest',
      explanation: `
### 1. Definition
Spread (...) expands elements. Rest (...) collects them into an array.

### 2. Syntax
\`\`\`javascript
const newArr = [...old];
function sum(...args) { ... }
\`\`\`

### 3. Real Example
Copying an array without changing the original or accepting infinite function arguments.
`,
      order: 2,
      difficulty: 'Intermediate',
      quiz: [{ question: 'What symbol represents both spread and rest?', options: ['...', '***', '&&&'], correctAnswer: '...' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv7._id,
      title: 'Modules (import/export)',
      slug: 'js-modules',
      explanation: `
### 1. Definition
Modules allow splitting code into separate files to keep projects organized.

### 2. Syntax
\`\`\`javascript
export const x = 1;
import { x } from './file.js';
\`\`\`

### 3. Real Example
Keeping utility functions in one file and components in another.
`,
      order: 3,
      difficulty: 'Intermediate',
      quiz: [{ question: 'Which keyword shares code with other files?', options: ['share', 'export', 'give'], correctAnswer: 'export' }]
    });

    await createLesson({
      topicId: jsTopic._id,
      levelId: lv7._id,
      title: 'Default parameters',
      slug: 'js-default-params',
      explanation: `
### 1. Definition
Allow named parameters to be initialized with default values if no value is passed.

### 2. Syntax
\`\`\`javascript
function greet(name = "Guest") { ... }
\`\`\`

### 3. Real Example
Providing a fallback value for a user preference if they haven't set one yet.
`,
      order: 4,
      difficulty: 'Intermediate',
      quiz: [{ question: 'When is the default parameter used?', options: ['Always', 'Only if the value is undefined', 'Never'], correctAnswer: 'Only if the value is undefined' }]
    });

    console.log('CONGRATULATIONS! ALL 25+ TOPICS SEEDED SUCCESSFULLY! 🚀');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedFullCurriculum();
