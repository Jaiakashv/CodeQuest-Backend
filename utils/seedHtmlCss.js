const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Topic = require('../models/Topic');
const Level = require('../models/Level');
const Lesson = require('../models/Lesson');
const Challenge = require('../models/Challenge');

const seedHtmlCss = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB...');

    let htmlTopic = await Topic.findOne({ slug: 'html-basics' });
    if (!htmlTopic) {
      htmlTopic = await Topic.create({ title: 'HTML Mastery', slug: 'html-basics', description: 'Master the structure of the web.', icon: '🌐', difficulty: 'Beginner' });
    }

    let cssTopic = await Topic.findOne({ slug: 'css-mastery' });
    if (!cssTopic) {
      cssTopic = await Topic.create({ title: 'CSS Masterclass', slug: 'css-mastery', description: 'Design beautiful, responsive websites.', icon: '🎨', difficulty: 'Beginner' });
    }

    await Lesson.deleteMany({ topicId: { $in: [htmlTopic._id, cssTopic._id] } });
    await Level.deleteMany({ topicId: { $in: [htmlTopic._id, cssTopic._id] } });
    await Challenge.deleteMany({ topicId: { $in: [htmlTopic._id, cssTopic._id] } });

    const createLesson = async (topicId, levelId, data, challengeData) => {
      const lesson = await Lesson.create({ ...data, topicId, levelId });
      if (challengeData) {
        await Challenge.create({ ...challengeData, topicId, lessonId: lesson._id });
        lesson.challenge = true; // Temporary flag or we could link ID
        await lesson.save();
      }
      return lesson;
    };

    // ==========================================
    // SEED HTML (23 Topics)
    // ==========================================
    console.log('Seeding HTML...');
    
    // Level 1: HTML Foundations
    const hlv1 = await Level.create({ topicId: htmlTopic._id, title: 'HTML Foundations', order: 1 });
    await createLesson(htmlTopic._id, hlv1._id, { title: 'HTML Basics', slug: 'html-basics-1', explanation: '### 1. Definition\nHTML is the skeleton of a webpage.\n### 2. Syntax\n\`\`\`html\n<p>Hello</p>\n\`\`\`\n### 3. Real Example\nA basic text node on a website.' });
    await createLesson(htmlTopic._id, hlv1._id, { title: 'HTML Document Structure', slug: 'html-structure', explanation: '### 1. Definition\nThe required boilerplate for every HTML file.\n### 2. Syntax\n\`\`\`html\n<!DOCTYPE html><html>...</html>\n\`\`\`\n### 3. Real Example\nThe starting point of any new web project.' });
    await createLesson(htmlTopic._id, hlv1._id, { title: 'Semantic HTML', slug: 'html-semantic', explanation: '### 1. Definition\nUsing tags that have meaning (header, footer, main).\n### 2. Syntax\n\`\`\`html\n<main></main>\n\`\`\`\n### 3. Real Example\nImproving SEO and accessibility for search engines.' });
    await createLesson(htmlTopic._id, hlv1._id, { title: 'HTML Tags & Elements', slug: 'html-tags-elements', explanation: '### 1. Definition\nTags are the syntax, Elements are the resulting objects.\n### 2. Syntax\n\`\`\`html\n<p>Element</p>\n\`\`\`\n### 3. Real Example\nEvery single part of a webpage is an element.' });

    // Level 2: Content & Media
    const hlv2 = await Level.create({ topicId: htmlTopic._id, title: 'Content & Media', order: 2 });
    await createLesson(htmlTopic._id, hlv2._id, { title: 'Attributes', slug: 'html-attributes', explanation: '### 1. Definition\nAdditional information for tags (id, class, src).\n### 2. Syntax\n\`\`\`html\n<div class="header"></div>\n\`\`\`\n### 3. Real Example\nAssigning a unique ID to a section for styling.' });
    await createLesson(htmlTopic._id, hlv2._id, { title: 'Headings & Paragraphs', slug: 'html-text', explanation: '### 1. Definition\nStructuring text content.\n### 2. Syntax\n\`\`\`html\n<h1>Title</h1>\n<p>Text</p>\n\`\`\`\n### 3. Real Example\nA news article with a headline and body.' });
    await createLesson(htmlTopic._id, hlv2._id, { title: 'Links & Anchor Tags', slug: 'html-links', explanation: '### 1. Definition\nConnecting different pages together.\n### 2. Syntax\n\`\`\`html\n<a href="url">Link</a>\n\`\`\`\n### 3. Real Example\nA navigation menu linking to Home/About pages.' });
    await createLesson(htmlTopic._id, hlv2._id, { title: 'Images', slug: 'html-images', explanation: '### 1. Definition\nEmbedding visual content.\n### 2. Syntax\n\`\`\`html\n<img src="img.jpg" alt="alt text">\n\`\`\`\n### 3. Real Example\nA product photo on an e-commerce site.' });
    await createLesson(htmlTopic._id, hlv2._id, { title: 'Lists', slug: 'html-lists', explanation: '### 1. Definition\nOrdered (ol) and unordered (ul) lists.\n### 2. Syntax\n\`\`\`html\n<ul><li>Item</li></ul>\n\`\`\`\n### 3. Real Example\nA bulleted list of features on a landing page.' });

    // Level 3: Data & Interaction
    const hlv3 = await Level.create({ topicId: htmlTopic._id, title: 'Data & Interaction', order: 3 });
    await createLesson(htmlTopic._id, hlv3._id, { title: 'Tables', slug: 'html-tables', explanation: '### 1. Definition\nDisplaying data in rows and columns.\n### 2. Syntax\n\`\`\`html\n<table><tr><td>Data</td></tr></table>\n\`\`\`\n### 3. Real Example\nA pricing table for subscription plans.' });
    await createLesson(htmlTopic._id, hlv3._id, { title: 'Forms & Input Types', slug: 'html-forms', explanation: '### 1. Definition\nCollecting user data through various inputs.\n### 2. Syntax\n\`\`\`html\n<input type="text" />\n<input type="email" />\n\`\`\`\n### 3. Real Example\nA contact form or search bar.' });
    await createLesson(htmlTopic._id, hlv3._id, { title: 'Labels & Validation', slug: 'html-validation', explanation: '### 1. Definition\nConnecting labels to inputs and enforcing rules.\n### 2. Syntax\n\`\`\`html\n<label for="name">Name</label>\n<input id="name" required />\n\`\`\`\n### 3. Real Example\nMaking sure a user enters their email before submitting.' });

    // Level 4: Advanced HTML5
    const hlv4 = await Level.create({ topicId: htmlTopic._id, title: 'Advanced HTML5', order: 4 });
    await createLesson(htmlTopic._id, hlv4._id, { title: 'Audio & Video', slug: 'html-media', explanation: '### 1. Definition\nEmbedding multimedia content directly.\n### 2. Syntax\n\`\`\`html\n<video src="vid.mp4" controls></video>\n\`\`\`\n### 3. Real Example\nPlaying a demo video on a homepage.' });
    await createLesson(htmlTopic._id, hlv4._id, { title: 'iframe', slug: 'html-iframe', explanation: '### 1. Definition\nEmbedding another webpage inside your current page.\n### 2. Syntax\n\`\`\`html\n<iframe src="url"></iframe>\n\`\`\`\n### 3. Real Example\nEmbedding a YouTube video or Google Map.' });
    await createLesson(htmlTopic._id, hlv4._id, { title: 'Meta Tags & SEO Basics', slug: 'html-seo', explanation: '### 1. Definition\nData about the page for search engines and social media.\n### 2. Syntax\n\`\`\`html\n<meta name="description" content="...">\n\`\`\`\n### 3. Real Example\nThe text that appears when you share a link on WhatsApp.' });
    await createLesson(htmlTopic._id, hlv4._id, { title: 'Accessibility', slug: 'html-a11y', explanation: '### 1. Definition\nMaking the web usable for everyone (ARIA roles).\n### 2. Syntax\n\`\`\`html\n<button aria-label="Close"></button>\n\`\`\`\n### 3. Real Example\nEnsuring blind users can navigate your site with a screen reader.' });

    // Level 5: Layout & Graphics
    const hlv5 = await Level.create({ topicId: htmlTopic._id, title: 'Layout & Graphics', order: 5 });
    await createLesson(htmlTopic._id, hlv5._id, { title: 'Block vs Inline Elements', slug: 'html-display', explanation: '### 1. Definition\nHow elements occupy space (div vs span).\n### 2. Syntax\n\`\`\`html\n<div>Block</div><span>Inline</span>\n\`\`\`\n### 3. Real Example\nStyling one word inside a paragraph versus styling the whole paragraph.' });
    await createLesson(htmlTopic._id, hlv5._id, { title: 'HTML5 Storage', slug: 'html5-storage', explanation: '### 1. Definition\nSaving data in the browser (Local/Session Storage).\n### 2. Syntax\n\`\`\`javascript\nlocalStorage.setItem("key", "val");\n\`\`\`\n### 3. Real Example\nSaving a users preferred theme (Dark/Light).' });
    await createLesson(htmlTopic._id, hlv5._id, { title: 'Canvas & SVG', slug: 'html-graphics', explanation: '### 1. Definition\nDrawing graphics and using vector images.\n### 2. Syntax\n\`\`\`html\n<svg>...</svg>\n<canvas></canvas>\n\`\`\`\n### 3. Real Example\nUsing a scalable logo (SVG) or building a game (Canvas).' });

    // ==========================================
    // SEED CSS (27 Topics)
    // ==========================================
    console.log('Seeding CSS...');
    
    // Level 1: CSS Foundations
    const clv1 = await Level.create({ topicId: cssTopic._id, title: 'CSS Foundations', order: 1 });
    await createLesson(cssTopic._id, clv1._id, { title: 'CSS Basics', slug: 'css-basics-1', explanation: '### 1. Definition\nStyling HTML elements.\n### 2. Syntax\n\`\`\`css\np { color: blue; }\n\`\`\`\n### 3. Real Example\nChanging the font of your entire website.' });
    await createLesson(cssTopic._id, clv1._id, { title: 'Selectors & Specificity', slug: 'css-selectors', explanation: '### 1. Definition\nTargeting elements and resolving style conflicts.\n### 2. Syntax\n\`\`\`css\n#id { ... } .class { ... }\n\`\`\`\n### 3. Real Example\nApplying a red color only to "error" messages.' });
    await createLesson(cssTopic._id, clv1._id, { title: 'Box Model', slug: 'css-box-model', explanation: '### 1. Definition\nMargin, Border, Padding, and Content.\n### 2. Syntax\n\`\`\`css\n.box { padding: 10px; }\n\`\`\`\n### 3. Real Example\nAdding space inside a button.' });
    await createLesson(cssTopic._id, clv1._id, { title: 'Colors & Backgrounds', slug: 'css-colors', explanation: '### 1. Definition\nApplying colors and background images.\n### 2. Syntax\n\`\`\`css\nbody { background: #f0f0f0; }\n\`\`\`\n### 3. Real Example\nSetting the theme colors of your app.' });
    await createLesson(cssTopic._id, clv1._id, { title: 'Units (px, rem, em, vh, vw)', slug: 'css-units', explanation: '### 1. Definition\nMeasurement units in CSS.\n### 2. Syntax\n\`\`\`css\n.text { font-size: 1rem; }\n\`\`\`\n### 3. Real Example\nScaling text based on the user preferences.' });

    // Level 2: Layout Mastery
    const clv2 = await Level.create({ topicId: cssTopic._id, title: 'Layout Mastery', order: 2 });
    await createLesson(cssTopic._id, clv2._id, { title: 'Display Properties', slug: 'css-display', explanation: '### 1. Definition\nControlling how elements appear (block, inline, none).\n### 2. Syntax\n\`\`\`css\n.hide { display: none; }\n\`\`\`\n### 3. Real Example\nHiding a mobile menu on desktop screens.' });
    await createLesson(cssTopic._id, clv2._id, { title: 'Positioning', slug: 'css-position', explanation: '### 1. Definition\nStatic, Relative, Absolute, Fixed, Sticky.\n### 2. Syntax\n\`\`\`css\n.top { position: sticky; top: 0; }\n\`\`\`\n### 3. Real Example\nA navigation bar that stays at the top while scrolling.' });
    await createLesson(cssTopic._id, clv2._id, { title: 'Flexbox', slug: 'css-flexbox', explanation: '### 1. Definition\n1D layout system for rows or columns.\n### 2. Syntax\n\`\`\`css\n.flex { display: flex; }\n\`\`\`\n### 3. Real Example\nCentering a logo and menu items in a header.' });
    await createLesson(cssTopic._id, clv2._id, { title: 'CSS Grid', slug: 'css-grid', explanation: '### 1. Definition\n2D layout system for rows and columns.\n### 2. Syntax\n\`\`\`css\n.grid { display: grid; }\n\`\`\`\n### 3. Real Example\nA photo gallery with different sized images.' });

    // Level 3: Responsive & Interactive
    const clv3 = await Level.create({ topicId: cssTopic._id, title: 'Responsive & Interactive', order: 3 });
    await createLesson(cssTopic._id, clv3._id, { title: 'Media Queries', slug: 'css-media', explanation: '### 1. Definition\nStyles for different screen sizes.\n### 2. Syntax\n\`\`\`css\n@media (max-width: 768px) { ... }\n\`\`\`\n### 3. Real Example\nStacking columns vertically on mobile devices.' });
    await createLesson(cssTopic._id, clv3._id, { title: 'Pseudo Classes & Elements', slug: 'css-pseudo', explanation: '### 1. Definition\nStyling states (hover) and parts (before/after) of elements.\n### 2. Syntax\n\`\`\`css\nbutton:hover { opacity: 0.8; }\n\`\`\`\n### 3. Real Example\nShowing an underline when a user hovers over a link.' });

    // Level 4: Motion & Depth
    const clv4 = await Level.create({ topicId: cssTopic._id, title: 'Motion & Depth', order: 4 });
    await createLesson(cssTopic._id, clv4._id, { title: 'Transitions & Animations', slug: 'css-motion', explanation: '### 1. Definition\nMoving and animating elements smoothly.\n### 2. Syntax\n\`\`\`css\n.btn { transition: 0.3s; }\n\`\`\`\n### 3. Real Example\nA smooth fade-in effect for a modal.' });
    await createLesson(cssTopic._id, clv4._id, { title: 'Transform & z-index', slug: 'css-transform', explanation: '### 1. Definition\nRotating, scaling and layering elements.\n### 2. Syntax\n\`\`\`css\n.card:hover { transform: scale(1.05); }\n\`\`\`\n### 3. Real Example\nPopping a card out when the user hovers over it.' });

    // Level 5: Refined Design
    const clv5 = await Level.create({ topicId: cssTopic._id, title: 'Refined Design', order: 5 });
    await createLesson(cssTopic._id, clv5._id, { title: 'Inheritance & Variables', slug: 'css-variables-2', explanation: '### 1. Definition\nCSS Variables for clean, maintainable code.\n### 2. Syntax\n\`\`\`css\n:root { --main-bg: #fff; }\n\`\`\`\n### 3. Real Example\nChanging the primary color of your whole site by editing one line.' });
    await createLesson(cssTopic._id, clv5._id, { title: 'Overflow & Visibility', slug: 'css-overflow', explanation: '### 1. Definition\nHandling content that is too big for its container.\n### 2. Syntax\n\`\`\`css\n.scroll { overflow: auto; }\n\`\`\`\n### 3. Real Example\nAdding a scrollbar to a long list of messages.' });

    // Level 6: Components & Patterns
    const clv6 = await Level.create({ topicId: cssTopic._id, title: 'Components & Patterns', order: 6 });
    await createLesson(cssTopic._id, clv6._id, { title: 'Navbar Design', slug: 'css-navbar', explanation: '### 1. Definition\nBuilding responsive navigation menus.\n### 2. Syntax\n\`\`\`css\nnav { position: fixed; width: 100%; }\n\`\`\`\n### 3. Real Example\nThe navigation bar you see at the top of this app!' });
    await createLesson(cssTopic._id, clv6._id, { title: 'Card Design', slug: 'css-cards', explanation: '### 1. Definition\nCreating modern, clean UI cards.\n### 2. Syntax\n\`\`\`css\n.card { border-radius: 12px; shadow: ...; }\n\`\`\`\n### 3. Real Example\nProduct cards on Amazon or Netflix.' });
    await createLesson(cssTopic._id, clv6._id, { title: 'Centering Elements', slug: 'css-centering', explanation: '### 1. Definition\nThe holy grail of CSS: perfect centering.\n### 2. Syntax\n\`\`\`css\n.center { display: grid; place-items: center; }\n\`\`\`\n### 3. Real Example\nCentering a login form in the middle of the screen.' });

    console.log('HTML AND CSS CURRICULUM SEEDED SUCCESSFULLY! 🚀');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedHtmlCss();
