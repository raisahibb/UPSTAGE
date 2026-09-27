/**
 * seedQuestionBank.js
 *
 * Curated fallback questions ko MongoDB mein seed karta hai.
 * Ye AI-generated nahi hain — manually reviewed interview-quality questions hain.
 *
 * IDEMPOTENT: Multiple runs pe duplicate nahi banata.
 * Key = questionText + domain + difficulty (unique index on schema).
 *
 * Usage:
 *   node scripts/seedQuestionBank.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const QuestionBank = require('../src/models/QuestionBank');

const QUESTIONS = [
  // ============================================================
  // FRONTEND ENGINEERING
  // ============================================================
  // Easy
  { domain: 'Frontend Engineering', difficulty: 'Easy', questionType: 'technical', questionText: 'What is the difference between HTML, CSS, and JavaScript and what role does each play in a web page?' },
  { domain: 'Frontend Engineering', difficulty: 'Easy', questionType: 'technical', questionText: 'Explain the CSS box model and its four components.' },
  { domain: 'Frontend Engineering', difficulty: 'Easy', questionType: 'technical', questionText: 'What is the difference between inline, block, and inline-block display values in CSS?' },
  { domain: 'Frontend Engineering', difficulty: 'Easy', questionType: 'technical', questionText: 'What is semantic HTML and why is it important?' },
  { domain: 'Frontend Engineering', difficulty: 'Easy', questionType: 'general',   questionText: 'How do you stay up to date with changes in frontend technologies and browser standards?' },
  { domain: 'Frontend Engineering', difficulty: 'Easy', questionType: 'behavioral', questionText: 'Describe a time you had to fix a CSS layout bug under a tight deadline.' },
  { domain: 'Frontend Engineering', difficulty: 'Easy', questionType: 'technical', questionText: 'What is the purpose of the "viewport" meta tag in responsive web design?' },
  { domain: 'Frontend Engineering', difficulty: 'Easy', questionType: 'technical', questionText: 'Explain the difference between localStorage, sessionStorage, and cookies.' },

  // Medium
  { domain: 'Frontend Engineering', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain the virtual DOM in React and why it improves performance compared to direct DOM manipulation.' },
  { domain: 'Frontend Engineering', difficulty: 'Medium', questionType: 'technical', questionText: 'What is event delegation in JavaScript and when would you use it?' },
  { domain: 'Frontend Engineering', difficulty: 'Medium', questionType: 'technical', questionText: 'Describe the differences between CSS Flexbox and CSS Grid and when you would choose each.' },
  { domain: 'Frontend Engineering', difficulty: 'Medium', questionType: 'technical', questionText: 'How does JavaScript\'s prototype chain work and how does it relate to inheritance?' },
  { domain: 'Frontend Engineering', difficulty: 'Medium', questionType: 'technical', questionText: 'What are React Hooks? Explain the rules of Hooks and name three commonly used built-in Hooks.' },
  { domain: 'Frontend Engineering', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Describe a challenging performance problem you encountered in a frontend application and how you resolved it.' },
  { domain: 'Frontend Engineering', difficulty: 'Medium', questionType: 'technical', questionText: 'What is debouncing and throttling? Give a practical example where each should be used.' },
  { domain: 'Frontend Engineering', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain how the browser\'s critical rendering path works and how you can optimize it.' },

  // Hard
  { domain: 'Frontend Engineering', difficulty: 'Hard', questionType: 'technical', questionText: 'Describe the differences between server-side rendering, static site generation, and client-side rendering. When would you choose each?' },
  { domain: 'Frontend Engineering', difficulty: 'Hard', questionType: 'technical', questionText: 'What is the JavaScript event loop and how do the call stack, task queue, and microtask queue interact?' },
  { domain: 'Frontend Engineering', difficulty: 'Hard', questionType: 'technical', questionText: 'How would you architect a large-scale frontend application to ensure maintainability, performance, and testability?' },
  { domain: 'Frontend Engineering', difficulty: 'Hard', questionType: 'technical', questionText: 'Explain Content Security Policy (CSP) and how you would implement it to prevent XSS attacks.' },
  { domain: 'Frontend Engineering', difficulty: 'Hard', questionType: 'behavioral', questionText: 'Describe a situation where you had to make a significant architectural decision in a frontend project. What was your process?' },

  // ============================================================
  // BACKEND DEVELOPMENT
  // ============================================================
  // Easy
  { domain: 'Backend Development', difficulty: 'Easy', questionType: 'technical', questionText: 'What is a REST API and what are the HTTP methods used in REST?' },
  { domain: 'Backend Development', difficulty: 'Easy', questionType: 'technical', questionText: 'Explain the difference between SQL and NoSQL databases. Give an example of each.' },
  { domain: 'Backend Development', difficulty: 'Easy', questionType: 'technical', questionText: 'What is middleware in the context of a web server like Express.js?' },
  { domain: 'Backend Development', difficulty: 'Easy', questionType: 'technical', questionText: 'What is the purpose of environment variables and why should you never hardcode secrets in source code?' },
  { domain: 'Backend Development', difficulty: 'Easy', questionType: 'behavioral', questionText: 'Tell me about a backend bug you found and how you debugged and resolved it.' },
  { domain: 'Backend Development', difficulty: 'Easy', questionType: 'technical', questionText: 'What is JWT and how is it used for authentication?' },
  { domain: 'Backend Development', difficulty: 'Easy', questionType: 'general',   questionText: 'How do you approach writing clean, maintainable backend code?' },
  { domain: 'Backend Development', difficulty: 'Easy', questionType: 'technical', questionText: 'What is the difference between authentication and authorization?' },

  // Medium
  { domain: 'Backend Development', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain database indexing. When would adding an index improve performance and when could it harm it?' },
  { domain: 'Backend Development', difficulty: 'Medium', questionType: 'technical', questionText: 'What is the N+1 query problem and how do you solve it?' },
  { domain: 'Backend Development', difficulty: 'Medium', questionType: 'technical', questionText: 'Describe the difference between horizontal and vertical scaling. What are the trade-offs?' },
  { domain: 'Backend Development', difficulty: 'Medium', questionType: 'technical', questionText: 'What is connection pooling and why is it important for database-backed applications?' },
  { domain: 'Backend Development', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain the concept of idempotency in APIs. Which HTTP methods should be idempotent?' },
  { domain: 'Backend Development', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Describe a time when you had to optimize a slow API endpoint. What was your approach?' },
  { domain: 'Backend Development', difficulty: 'Medium', questionType: 'technical', questionText: 'What is rate limiting and how would you implement it in a Node.js API?' },
  { domain: 'Backend Development', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain how bcrypt works and why it is preferred for password hashing over MD5 or SHA-256.' },

  // Hard
  { domain: 'Backend Development', difficulty: 'Hard', questionType: 'technical', questionText: 'How would you design a distributed job queue system that handles retries, deduplication, and priority?' },
  { domain: 'Backend Development', difficulty: 'Hard', questionType: 'technical', questionText: 'Explain the CAP theorem. How does it affect your choice of database when designing distributed systems?' },
  { domain: 'Backend Development', difficulty: 'Hard', questionType: 'technical', questionText: 'How would you implement optimistic locking versus pessimistic locking in a backend application? When would you choose each?' },
  { domain: 'Backend Development', difficulty: 'Hard', questionType: 'technical', questionText: 'Describe how you would design a multi-tenant SaaS backend with data isolation and performance in mind.' },
  { domain: 'Backend Development', difficulty: 'Hard', questionType: 'behavioral', questionText: 'Tell me about a production outage you were involved in. What was the root cause and how did you prevent recurrence?' },

  // ============================================================
  // FULL STACK DEVELOPMENT
  // ============================================================
  // Easy
  { domain: 'Full Stack Development', difficulty: 'Easy', questionType: 'technical', questionText: 'Explain the client-server architecture and how a typical HTTP request-response cycle works.' },
  { domain: 'Full Stack Development', difficulty: 'Easy', questionType: 'technical', questionText: 'What is CORS and why does a browser enforce it? How do you resolve CORS errors?' },
  { domain: 'Full Stack Development', difficulty: 'Easy', questionType: 'behavioral', questionText: 'Describe how you typically split work between frontend and backend when building a new feature.' },
  { domain: 'Full Stack Development', difficulty: 'Easy', questionType: 'technical', questionText: 'What is the purpose of a package.json file and what information does it typically contain?' },
  { domain: 'Full Stack Development', difficulty: 'Easy', questionType: 'general',   questionText: 'How do you handle version control when working on a full stack project?' },
  { domain: 'Full Stack Development', difficulty: 'Easy', questionType: 'technical', questionText: 'What is the difference between a monolithic and microservices architecture?' },
  { domain: 'Full Stack Development', difficulty: 'Easy', questionType: 'technical', questionText: 'Explain what an ORM is and give an example of one.' },

  // Medium
  { domain: 'Full Stack Development', difficulty: 'Medium', questionType: 'technical', questionText: 'How would you implement real-time features in a full stack application? Compare WebSockets, Server-Sent Events, and polling.' },
  { domain: 'Full Stack Development', difficulty: 'Medium', questionType: 'technical', questionText: 'Describe your approach to handling file uploads in a full stack application, including storage, validation, and security.' },
  { domain: 'Full Stack Development', difficulty: 'Medium', questionType: 'technical', questionText: 'How do you manage authentication state across both frontend and backend? Describe a secure token-based flow.' },
  { domain: 'Full Stack Development', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Describe a time you had to integrate a third-party API into a full stack application. What challenges did you face?' },
  { domain: 'Full Stack Development', difficulty: 'Medium', questionType: 'technical', questionText: 'What is the purpose of a reverse proxy and how does Nginx or similar tools fit into a full stack deployment?' },
  { domain: 'Full Stack Development', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain how you would implement pagination in both the API and the frontend UI.' },

  // Hard
  { domain: 'Full Stack Development', difficulty: 'Hard', questionType: 'technical', questionText: 'How would you architect a full stack application that needs to handle 1 million daily active users? Cover both frontend and backend concerns.' },
  { domain: 'Full Stack Development', difficulty: 'Hard', questionType: 'technical', questionText: 'Describe your approach to end-to-end testing in a full stack application. What tools and strategies would you use?' },
  { domain: 'Full Stack Development', difficulty: 'Hard', questionType: 'behavioral', questionText: 'Tell me about the most complex full stack feature you have built end-to-end. What was your design process?' },

  // ============================================================
  // DATA STRUCTURES
  // ============================================================
  // Easy
  { domain: 'Data Structures', difficulty: 'Easy', questionType: 'technical', questionText: 'What is the difference between an array and a linked list? When would you prefer each?' },
  { domain: 'Data Structures', difficulty: 'Easy', questionType: 'technical', questionText: 'Explain what a stack is and describe a real-world use case for it.' },
  { domain: 'Data Structures', difficulty: 'Easy', questionType: 'technical', questionText: 'What is a queue data structure? Describe the difference between FIFO and LIFO.' },
  { domain: 'Data Structures', difficulty: 'Easy', questionType: 'technical', questionText: 'What is Big-O notation? Explain the time complexity of common array operations.' },
  { domain: 'Data Structures', difficulty: 'Easy', questionType: 'technical', questionText: 'Explain how a hash map (dictionary) works and what its average-case time complexity is for lookups.' },
  { domain: 'Data Structures', difficulty: 'Easy', questionType: 'general',   questionText: 'How do you decide which data structure to use when solving a programming problem?' },
  { domain: 'Data Structures', difficulty: 'Easy', questionType: 'technical', questionText: 'What is a binary search and what precondition must be true for it to work?' },

  // Medium
  { domain: 'Data Structures', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain binary trees, binary search trees, and balanced BSTs. How does balancing affect performance?' },
  { domain: 'Data Structures', difficulty: 'Medium', questionType: 'technical', questionText: 'Describe depth-first search and breadth-first search. Compare their time and space complexity.' },
  { domain: 'Data Structures', difficulty: 'Medium', questionType: 'technical', questionText: 'What is a heap data structure? Explain how it is used to implement a priority queue.' },
  { domain: 'Data Structures', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain the difference between dynamic programming and greedy algorithms. Give an example of each.' },
  { domain: 'Data Structures', difficulty: 'Medium', questionType: 'technical', questionText: 'What is a graph data structure? Explain the difference between directed and undirected graphs and their common representations.' },
  { domain: 'Data Structures', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Describe a situation where choosing the right data structure significantly improved the performance of your code.' },
  { domain: 'Data Structures', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain how quicksort works and analyze its best-case, average-case, and worst-case time complexity.' },
  { domain: 'Data Structures', difficulty: 'Medium', questionType: 'technical', questionText: 'What is memoization and how does it relate to dynamic programming?' },

  // Hard
  { domain: 'Data Structures', difficulty: 'Hard', questionType: 'technical', questionText: 'Explain how consistent hashing works and why it is useful in distributed systems.' },
  { domain: 'Data Structures', difficulty: 'Hard', questionType: 'technical', questionText: 'Describe a trie data structure. What problems is it particularly well-suited to solve?' },
  { domain: 'Data Structures', difficulty: 'Hard', questionType: 'technical', questionText: 'What is a segment tree and when would you use one over simpler alternatives?' },
  { domain: 'Data Structures', difficulty: 'Hard', questionType: 'technical', questionText: 'Explain the Floyd-Warshall algorithm. What problem does it solve and what is its time complexity?' },
  { domain: 'Data Structures', difficulty: 'Hard', questionType: 'behavioral', questionText: 'Describe a time you had to optimize a solution from O(n²) to a more efficient complexity. Walk me through your reasoning.' },

  // ============================================================
  // SYSTEM DESIGN
  // ============================================================
  // Easy
  { domain: 'System Design', difficulty: 'Easy', questionType: 'technical', questionText: 'What is a load balancer and why is it used in distributed systems?' },
  { domain: 'System Design', difficulty: 'Easy', questionType: 'technical', questionText: 'Explain the difference between caching and database indexing as performance optimization strategies.' },
  { domain: 'System Design', difficulty: 'Easy', questionType: 'technical', questionText: 'What is the difference between synchronous and asynchronous communication in a system design context?' },
  { domain: 'System Design', difficulty: 'Easy', questionType: 'general',   questionText: 'How do you approach estimating the scale requirements when designing a new system?' },
  { domain: 'System Design', difficulty: 'Easy', questionType: 'technical', questionText: 'What is a CDN (Content Delivery Network) and how does it improve application performance?' },
  { domain: 'System Design', difficulty: 'Easy', questionType: 'technical', questionText: 'Explain the concept of a message queue and give a real-world use case.' },

  // Medium
  { domain: 'System Design', difficulty: 'Medium', questionType: 'technical', questionText: 'Design a URL shortening service like bit.ly. Walk through your data model, API design, and scaling approach.' },
  { domain: 'System Design', difficulty: 'Medium', questionType: 'technical', questionText: 'How would you design a notification system that delivers push, email, and SMS notifications reliably at scale?' },
  { domain: 'System Design', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain the trade-offs between SQL and NoSQL databases when designing a system at scale.' },
  { domain: 'System Design', difficulty: 'Medium', questionType: 'technical', questionText: 'How would you design a rate limiting system to protect an API from abuse? Describe different algorithms for rate limiting.' },
  { domain: 'System Design', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Describe a system design decision you made that involved significant trade-offs. How did you evaluate the options?' },
  { domain: 'System Design', difficulty: 'Medium', questionType: 'technical', questionText: 'What is database sharding? When would you shard a database and what challenges does it introduce?' },
  { domain: 'System Design', difficulty: 'Medium', questionType: 'technical', questionText: 'Explain the difference between leader-follower (primary-replica) and peer-to-peer replication in databases.' },

  // Hard
  { domain: 'System Design', difficulty: 'Hard', questionType: 'technical', questionText: 'Design a distributed cache system like Redis at scale. Cover consistency, eviction policies, and replication.' },
  { domain: 'System Design', difficulty: 'Hard', questionType: 'technical', questionText: 'How would you design a real-time collaborative document editing system like Google Docs? Focus on conflict resolution and consistency.' },
  { domain: 'System Design', difficulty: 'Hard', questionType: 'technical', questionText: 'Design a global-scale payments processing system. What are the key reliability and consistency requirements and how do you meet them?' },
  { domain: 'System Design', difficulty: 'Hard', questionType: 'technical', questionText: 'How would you design a distributed search engine? Describe indexing, query processing, and ranking at scale.' },
  { domain: 'System Design', difficulty: 'Hard', questionType: 'behavioral', questionText: 'Describe the most complex system you have designed or contributed to. What were the key architectural decisions?' },

  // ============================================================
  // BEHAVIORAL (General)
  // ============================================================
  // Easy
  { domain: 'Behavioral', difficulty: 'Easy', questionType: 'behavioral', questionText: 'Tell me about yourself and your background in software development.' },
  { domain: 'Behavioral', difficulty: 'Easy', questionType: 'behavioral', questionText: 'What are your greatest strengths as a developer?' },
  { domain: 'Behavioral', difficulty: 'Easy', questionType: 'behavioral', questionText: 'Describe a project you are most proud of and your contribution to it.' },
  { domain: 'Behavioral', difficulty: 'Easy', questionType: 'behavioral', questionText: 'How do you prioritize tasks when you have multiple deadlines competing for your attention?' },
  { domain: 'Behavioral', difficulty: 'Easy', questionType: 'general',   questionText: 'Why did you choose software engineering as a career?' },
  { domain: 'Behavioral', difficulty: 'Easy', questionType: 'behavioral', questionText: 'Describe your ideal working environment and team dynamic.' },
  { domain: 'Behavioral', difficulty: 'Easy', questionType: 'behavioral', questionText: 'What motivates you to do your best work?' },

  // Medium
  { domain: 'Behavioral', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Tell me about a time you disagreed with a technical decision made by your team. How did you handle it?' },
  { domain: 'Behavioral', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Describe a situation where you had to learn a new technology quickly to complete a project. How did you approach it?' },
  { domain: 'Behavioral', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Tell me about a time you failed on a project. What did you learn from the experience?' },
  { domain: 'Behavioral', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Describe a time when you had to give difficult feedback to a colleague. How did you handle it?' },
  { domain: 'Behavioral', difficulty: 'Medium', questionType: 'behavioral', questionText: 'How do you approach mentoring junior developers or onboarding new team members?' },
  { domain: 'Behavioral', difficulty: 'Medium', questionType: 'behavioral', questionText: 'Tell me about a time you had to advocate for better engineering practices like code reviews or testing in your team.' },
  { domain: 'Behavioral', difficulty: 'Medium', questionType: 'general',   questionText: 'How do you balance technical debt with the need to deliver features quickly?' },

  // Hard
  { domain: 'Behavioral', difficulty: 'Hard', questionType: 'behavioral', questionText: 'Describe the most ambiguous project you have worked on. How did you bring clarity and drive it to completion?' },
  { domain: 'Behavioral', difficulty: 'Hard', questionType: 'behavioral', questionText: 'Tell me about a time you led a team through a major technical crisis. What was your approach to leadership under pressure?' },
  { domain: 'Behavioral', difficulty: 'Hard', questionType: 'behavioral', questionText: 'Describe a time when you had to influence a decision without direct authority. What was your strategy?' },
  { domain: 'Behavioral', difficulty: 'Hard', questionType: 'behavioral', questionText: 'What is your philosophy on software quality and technical excellence? How do you operationalize it in practice?' },
  { domain: 'Behavioral', difficulty: 'Hard', questionType: 'general',   questionText: 'Where do you see yourself in five years and how does this role fit into your engineering career goals?' },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    let created = 0;
    let existing = 0;

    for (const q of QUESTIONS) {
      try {
        await QuestionBank.create(q);
        created++;
      } catch (err) {
        if (err.code === 11000) {
          // Duplicate key — already seeded, skip
          existing++;
        } else {
          console.error('Unexpected error seeding question:', q.questionText, err.message);
        }
      }
    }

    console.log(`\nSeeding complete:`);
    console.log(`  Created : ${created}`);
    console.log(`  Existing: ${existing}`);
    console.log(`  Total   : ${QUESTIONS.length}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

run();
