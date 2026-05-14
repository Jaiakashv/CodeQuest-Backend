require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Problem = require('../models/Problem');

const problems = [
  {
    title: "Reverse a String",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    language: "javascript",
    difficulty: "Easy",
    category: "String",
    starterCode: "function reverseString(s) {\n  // Your code here\n}",
    testCases: [
      { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' }
    ]
  },
  {
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    language: "python",
    difficulty: "Easy",
    category: "Math",
    starterCode: "class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        # Your code here",
    testCases: [
      { input: "121", expectedOutput: "true" },
      { input: "-121", expectedOutput: "false" }
    ]
  },
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    language: "java",
    difficulty: "Easy",
    category: "Array",
    starterCode: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}",
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" }
    ]
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    language: "javascript",
    difficulty: "Easy",
    category: "Stack",
    starterCode: "function isValid(s) {\n  // Your code here\n}",
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" }
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    language: "python",
    difficulty: "Easy",
    category: "Linked List",
    starterCode: "def mergeTwoLists(list1, list2):\n    # Your code here",
    testCases: [
      { input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" }
    ]
  }
];

const seedProblems = async () => {
  try {
    await connectDB();
    await Problem.deleteMany({ language: { $in: ['javascript', 'python', 'java'] } });
    await Problem.insertMany(problems);
    console.log('Problems seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding problems:', error);
    process.exit(1);
  }
};

seedProblems();
