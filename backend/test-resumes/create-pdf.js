const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('test-resume.pdf'));
doc.fontSize(20).text('Alex Carter - Software Engineer', { align: 'center' });
doc.moveDown();
doc.fontSize(14).text('EXPERIENCE');
doc.fontSize(12).text('- Built UPSTAGE using React, Node.js, MongoDB and Google Gemini.');
doc.text('- Implemented a custom rate limiter and JWT authentication.');
doc.moveDown();
doc.fontSize(14).text('SKILLS');
doc.fontSize(12).text('JavaScript, Python, TensorFlow, YOLO, Kubernetes');
doc.end();

console.log("PDF created: test-resume.pdf");
