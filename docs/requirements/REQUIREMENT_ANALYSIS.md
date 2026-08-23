# UPSTAGE — Requirement Analysis

## 1. Project Overview

UPSTAGE is an AI-powered mock interview platform designed for students and job seekers. The system utilizes Large Language Models (LLMs) to generate personalized interview questions, evaluate candidate responses, and provide structured feedback. The platform aims to bridge the gap between academic preparation and industry expectations by providing a realistic, on-demand interview environment tailored to the user's domain and experience.

---

## 2. Problem Statement

Traditional mock interview processes face several limitations:
- **Dependence on Fixed Questions:** Existing platforms often rely on static question banks that do not adapt to the user's specific background or resume.
- **Manual Evaluation:** Assessing responses typically requires human intervention, which is subjective and time-consuming.
- **Limited Mentor Availability:** Scheduling mock interviews with experienced professionals is difficult and not scalable.
- **Lack of Personalized Practice:** Candidates receive generic questions that may not reflect the actual interview scenarios they will face.
- **Limited Immediate Feedback:** Candidates often have to wait for feedback, reducing the effectiveness of the practice session.

An on-demand AI-based platform addresses these issues by providing accessible, personalized, and instantaneous interview practice and evaluation without relying on human mentors.

---

## 3. Target Users

### Candidate / Student
Candidates use the platform to practice their interview skills in a simulated environment. They can select their specific domain, adjust the difficulty level, and receive detailed feedback to improve their performance before actual job interviews.

### Job Seeker
Job seekers leverage the platform's ability to personalize questions based on their uploaded resumes. This helps them prepare for role-specific interviews and anticipate questions related to their actual experience and projects.

### Administrator
Administrators are responsible for platform management. They monitor system usage, manage user accounts, and oversee the question bank to ensure the platform operates smoothly and the content remains relevant.

---

## 4. Existing System / Traditional Approach

The traditional mock interview process typically involves a candidate scheduling a session with a mentor or peer, or using basic software that presents a list of questions. 

This approach has significant limitations:
- **Fixed Question Sets:** The questions are often predetermined and fail to adapt to the candidate's specific skills or resume.
- **Manual Evaluation:** Feedback relies on the subjective assessment of a human evaluator.
- **Mentor Dependency:** The process cannot happen without a willing and available human mentor.
- **Limited Availability:** Practice is restricted by the schedules of both the candidate and the mentor.
- **Delayed Feedback:** Constructive feedback is rarely immediate and sometimes lacks structured detail.
- **Limited Personalization:** Standardized mock interviews rarely reflect the nuanced, personalized questioning of a real technical or HR interview.

---

## 5. Proposed System

UPSTAGE improves upon the traditional process by providing an automated, intelligent, and highly accessible platform. 

The proposed system includes:
- **On-Demand Interview Practice:** Available at any time without the need for human scheduling.
- **Domain Selection:** Candidates can choose the specific field they want to be tested in (e.g., Software Engineering, Data Science).
- **Difficulty Selection:** The complexity of the interview can be adjusted to match the user's proficiency.
- **Resume-Aware Interview:** The system parses uploaded resumes to tailor questions specifically to the candidate's background.
- **AI-Generated Questions:** Dynamically generated questions ensure a unique experience every time.
- **Text/Audio Response Capture:** Users can type or speak their answers, simulating real interview conditions.
- **AI Evaluation:** Automated, rubric-based assessment of candidate responses.
- **Scoring:** Objective scoring based on predefined parameters.
- **Strengths and Weaknesses:** Detailed breakdown of areas where the candidate excels or needs improvement.
- **Improvement Suggestions:** Actionable advice provided for future interviews.
- **Performance Reports:** Comprehensive summaries generated at the end of each session.
- **Interview History:** Candidates can review past sessions and track their progress over time.

---

## 6. Project Objectives

The primary objectives of the UPSTAGE project are to:
- Provide on-demand mock interview practice accessible to all users.
- Personalize interview questions dynamically using the candidate's chosen domain, selected difficulty, and uploaded resume information.
- Automatically evaluate candidate responses using AI without human intervention.
- Provide structured, objective, and immediate feedback after each interview.
- Help candidates identify their specific strengths and weaknesses.
- Help candidates track their interview performance and progress over time.
- Provide administrative tools for user management and platform analytics.

---

## 7. Functional Requirements

### FR-01 Authentication
- The system must allow users to sign up for a new account.
- The system must allow existing users to log in securely.
- The system must implement password security (e.g., hashing).
- The system must use JWT-based authentication for session management.
- The system must support role-based access for 'Candidate' and 'Admin' roles.

### FR-02 Interview Setup
- The system must allow candidates to select an interview domain.
- The system must allow candidates to select an interview difficulty level.
- The system must allow candidates to configure the duration of the interview.
- The system must allow candidates to upload their resume for context.

### FR-03 Question Generation
- The system must utilize candidate information for context.
- The system must parse and utilize resume information to tailor questions.
- The system must generate questions based on the selected domain and difficulty.
- The system must use an LLM-based service to generate relevant and unique questions.

### FR-04 Interview Session
- The system must display generated questions one at a time.
- The system must capture candidate answers.
- The system must support text-based response capture.
- The system must support audio-based response capture.
- The system must allow navigation to the next question.
- The system must handle the completion of the interview session.

### FR-05 Speech-to-Text
- The system must integrate speech-to-text functionality (using Web Speech API or Whisper) to transcribe audio responses into text for evaluation.

### FR-06 AI Evaluation
- The system must evaluate responses based on relevance to the question.
- The system must evaluate the depth of the candidate's answer.
- The system must evaluate the clarity of the communication.
- The system must evaluate the technical accuracy of the response.
- The system must generate a score for each response.
- The system must provide specific feedback for each response.

### FR-07 Report Generation
- The system must calculate and present an overall interview score.
- The system must display per-question evaluation details.
- The system must identify and display the candidate's strengths.
- The system must identify and display the candidate's weaknesses.
- The system must provide actionable improvement suggestions.

### FR-08 History & Progress
- The system must store and display a history of previous interviews.
- The system must track and display historical scores.
- The system must provide visualizations or data for performance tracking over time.

### FR-09 Admin
- The system must provide user management capabilities for administrators.
- The system must display basic platform usage analytics.
- The system must allow administrators to view and manage the question bank or cached questions.

---

## 8. Non-Functional Requirements

### Performance
- The application should have a reasonable page response time to ensure a smooth user experience.
- The backend must ensure efficient API communication.
- The system must manage AI response latency gracefully by providing appropriate loading indicators to the user.

### Security
- The system must enforce password hashing before storing credentials.
- The system must use JWT authentication to secure API endpoints.
- The system must enforce role-based authorization to restrict admin features.
- The system must use secure environment variables for sensitive keys and database URIs.
- The system must ensure the protection and privacy of user profiles and uploaded resume data.

### Reliability
- The system must implement robust API error handling to prevent application crashes.
- The system must handle invalid or unstructured AI responses safely.
- The system must validate user inputs on both the client and server sides.
- The system must implement retry mechanisms where appropriate for external API calls (e.g., LLM services).

### Usability
- The user interface must be simple, intuitive, and beginner-friendly.
- The application must have clear navigation pathways.
- The feedback and reports provided to the user must be highly readable and well-structured.
- The application must feature a responsive UI that works across standard device sizes.

### Maintainability
- The codebase must be modular, separating concerns appropriately.
- The frontend must utilize reusable components.
- The project must follow a clear and logical folder structure.
- The codebase must include meaningful comments and maintain up-to-date documentation.

### Scalability
- The backend architecture must be modular to support future feature additions.
- The database design must be flexible enough to easily support additional interview domains or question types in the future.

---

## 9. User Stories

### Candidate
- "As a candidate, I want to select an interview domain so that I can practice for a specific role."
- "As a candidate, I want to upload my resume so that questions can be personalized."
- "As a candidate, I want to receive feedback after answering questions so that I can improve."
- "As a candidate, I want to see my previous interview scores so that I can track my progress."

### Admin
- "As an administrator, I want to manage users so that I can maintain the platform."
- "As an administrator, I want to view platform usage so that I can understand system activity."

---

## 10. User Workflow

### Candidate Workflow
Login → Dashboard → Interview Setup → Select Domain → Select Difficulty → Upload Resume → Start Interview → Question Generation → Interview Session → Answer Question → AI Evaluation → Next Question → Final Report → History / Progress

### Admin Workflow
Admin Login → Admin Dashboard → View Analytics → Manage Users → Manage Question Bank

---

## 11. Scope

### In Scope
- Candidate authentication and authorization
- Interview configuration (domain, difficulty, resume parsing)
- Dynamic AI-based question generation
- Text and audio answer capture
- AI-based response evaluation and scoring
- Comprehensive performance report generation
- Candidate history and progress tracking
- Basic admin dashboard and user management

### Out of Scope / Future Scope
- Multilingual interviews
- Real-time video interview mode
- Peer-to-peer interview matching
- Dedicated React Native mobile application
- Advanced predictive performance analytics

---

## 12. Constraints

- **LLM API Limits:** The system is constrained by the token limits, rate limits, and financial costs associated with third-party LLM APIs.
- **AI Response Consistency:** LLM response formats can sometimes be inconsistent, requiring strict parsing and validation.
- **Evaluation Subjectivity:** AI evaluation, while rubric-based, inherently carries some subjectivity and potential bias.
- **Speech/Browser Limitations:** The Web Speech API's accuracy and availability are dependent on the user's browser and hardware.
- **Data Privacy:** Strict handling is required to securely process and store user resumes and personal data.

---

## 13. Assumptions

- **Internet Access:** It is assumed that users have a stable internet connection to access the web application and external APIs.
- **API Availability:** It is assumed that the required third-party AI and Cloud services remain available and responsive.
- **Resume Format:** It is assumed that users will upload readable resumes in standard formats that can be parsed effectively.
- **Hardware/Browser:** It is assumed that the user's browser supports necessary features like the Web Speech API (where applicable) and that they have a functioning microphone for audio responses.

---

## 14. Requirement-to-Module Mapping

| Requirement ID | Requirement | Module | Priority |
|---|---|---|---|
| FR-01 | Authentication (Signup/Login/Roles) | Authentication | HIGH |
| FR-02 | Interview Setup (Domain/Difficulty/Resume) | Interview Setup | HIGH |
| FR-03 | LLM-based Question Generation | Question Generation | HIGH |
| FR-04 | Interview Session (Display/Capture/Navigation) | Interview Room | HIGH |
| FR-05 | Speech-to-Text Integration | Response Capture | MEDIUM |
| FR-06 | AI Evaluation (Score/Feedback) | Evaluation | HIGH |
| FR-07 | Report Generation (Overall/Strengths/Weaknesses) | Report | HIGH |
| FR-08 | History & Progress Tracking | History / Progress | MEDIUM |
| FR-09 | Admin User & Platform Management | Admin Dashboard | LOW |

---

## 15. ST-II Requirements

The following objectives constitute the immediate academic milestone for ST-II:
- **Requirement Analysis:** Finalizing the problem statement, scope, and functional/non-functional requirements.
- **System Design:** Defining the architecture, DFDs, ER diagrams, and UI/UX flows.
- **Frontend Development:** Creating the React application shell and core UI pages.
- **GitHub Repository:** Setting up the version control repository with an appropriate folder structure.
- **README:** Documenting the project setup and overview.
- **Team/Module Ownership:** Clearly defining and documenting who is responsible for which module.
- **Interactive React/JavaScript Frontend:** Delivering a working, interactive frontend application to demonstrate the platform's UI and flows.

---

## 16. Requirement Analysis Completion Checklist

- [ ] Problem statement finalized
- [ ] Target users finalized
- [ ] Functional requirements documented
- [ ] Non-functional requirements documented
- [ ] User stories documented
- [ ] User workflows documented
- [ ] Scope documented
- [ ] Constraints documented
- [ ] Requirement-to-module mapping completed
- [ ] ST-II requirements documented
