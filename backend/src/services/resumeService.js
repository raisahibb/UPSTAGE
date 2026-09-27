const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const MAX_RESUME_TEXT_LENGTH = 5000; // Cap to 5000 chars to avoid prompt injection & huge context

const parseResume = async (buffer, mimetype) => {
  let text = '';

  try {
    if (mimetype === 'application/pdf') {
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimetype === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (mimetype === 'text/plain') {
      text = buffer.toString('utf-8');
    } else {
      throw new Error(`Unsupported resume file format: ${mimetype}`);
    }

    // Clean whitespace and normalize
    text = text.replace(/\s+/g, ' ').trim();

    if (!text || text.length < 50) {
      throw new Error("Could not extract meaningful text from the resume. File may be empty or corrupted.");
    }

    // Cap the text length
    if (text.length > MAX_RESUME_TEXT_LENGTH) {
      text = text.substring(0, MAX_RESUME_TEXT_LENGTH) + '...';
    }

    return text;
  } catch (error) {
    throw new Error(`Resume processing failed: ${error.message}`);
  }
};

module.exports = { parseResume };
