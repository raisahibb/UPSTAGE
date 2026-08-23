# UPSTAGE — Functional Module Breakdown

## 1. Purpose of Module Breakdown

The complete UPSTAGE application is being divided into independent but connected modules to manage its complexity. This modularization will help with:

- **Development:** Different team members can work on different parts of the system simultaneously without interfering with each other.
- **Testing:** Individual modules can be tested in isolation before being integrated into the main system.
- **Maintenance:** Bugs can be isolated to specific modules, making them easier to fix without unintended side effects.
- **Team Ownership:** Clear boundaries allow specific team members to take primary ownership of defined features.
- **Frontend/Backend Separation:** Decoupling the client-side user interface from the server-side business logic and AI processing.
- **Future Expansion:** New features (e.g., additional interview domains or analytics) can be added as new modules without rewriting existing code.

---

## 2. COMPLETE SYSTEM MODULE MAP

### Candidate Side:

Authentication
      ↓
Candidate Dashboard
      ↓
Interview Setup
      ↓
Resume Processing
      ↓
Question Generation
      ↓
Interview Session
      ↓
Response Capture
      ↓
AI Evaluation
      ↓
Performance Report
      ↓
Interview History
      ↓
Progress Tracking

### Admin Side:

Admin Authentication
      ↓
Admin Dashboard
      ↓
User Management
      ↓
Question Bank Management
      ↓
Platform Analytics

*(Note: Shared AI, API, Database, and Storage services operate across these flows where required.)*

---

## 3. MODULE LIST

These modules represent our internal development decomposition of the documented UPSTAGE functionality:

M01 — Authentication & Authorization
M02 — Candidate Dashboard
M03 — Interview Setup
M04 — Resume Processing
M05 — Question Generation
M06 — Interview Session
M07 — Response Capture & Speech-to-Text
M08 — AI Response Evaluation
M09 — Performance Report
M10 — Interview History
M11 — Progress Tracking
M12 — Admin Dashboard
M13 — User Management
M14 — Question Bank Management
M15 — Platform Analytics
M16 — Shared UI & Application Infrastructure
M17 — AI / External Service Integration Layer
M18 — Backend API Layer
M19 — Database & Data Management Layer
M20 — File / Resume Storage Layer

---

## 4. DETAILED MODULE SPECIFICATION

### M01 — Authentication & Authorization
#### Purpose
Handles user identity verification and access control.
#### Main Responsibilities
- User signup and login
- Password security and hashing
- JWT authentication and token management
- Role-based access (Candidate/Admin roles)
- Protected route access
- Logout and session handling
#### Primary User
Candidate / Admin
#### Inputs
User credentials (email, password, name)
#### Outputs
Authentication tokens (JWT), User session data
#### Depends On
M18, M19
#### Used By
All protected frontend modules (M02, M03, M12, etc.)
#### Functional Requirements
FR-01
#### Frontend Responsibilities
Login, Signup, Password reset pages and authentication state management.
#### Backend Responsibilities
Authentication endpoints, token generation, password hashing, route protection middleware.
#### AI Responsibilities
None
#### Data Responsibilities
Reading and writing User records.
#### Primary Team Owner
Radhika (Frontend/System Design), Raisahib (Backend/Security Architecture)
#### Supporting Members
None
#### Development Phase
Phase 07 (Frontend), Phase 16 (Backend)
#### Testing Requirements
Token validation, protected route access, invalid login handling.
#### Completion Criteria
Users can securely sign up, log in, access role-specific protected routes, and log out.

### M02 — Candidate Dashboard
#### Purpose
Provides the main landing experience and overview for a logged-in candidate.
#### Main Responsibilities
- Welcome section
- Start interview action
- Displaying recent interviews
- Displaying latest score
- Showing quick statistics
#### Primary User
Candidate
#### Inputs
User session data, recent interview data
#### Outputs
Navigation triggers to Interview Setup or History
#### Depends On
M01, M16
#### Used By
Candidate
#### Functional Requirements
FR-01
#### Frontend Responsibilities
UI rendering of dashboard, widgets, and navigation links.
#### Backend Responsibilities
Providing summarized statistics and recent interview data.
#### AI Responsibilities
None
#### Data Responsibilities
Reading recent interviews and scores.
#### Primary Team Owner
Muskaan
#### Supporting Members
Rakshit
#### Development Phase
Phase 08
#### Testing Requirements
UI rendering, data fetching for dashboard widgets.
#### Completion Criteria
Candidate sees a personalized dashboard with accurate recent statistics and can navigate to start an interview.

### M03 — Interview Setup
#### Purpose
Allows the candidate to configure the parameters for their mock interview.
#### Main Responsibilities
- Domain selection
- Difficulty selection
- Duration configuration
- Resume selection/upload
- Validation of setup parameters
- Initiating the interview flow
#### Primary User
Candidate
#### Inputs
User selections (domain, difficulty, duration), resume file
#### Outputs
Interview configuration object
#### Depends On
M01, M16
#### Used By
M04, M05, M06
#### Functional Requirements
FR-02
#### Frontend Responsibilities
Configuration form UI, file upload UI, input validation.
#### Backend Responsibilities
Saving interview configuration.
#### AI Responsibilities
None
#### Data Responsibilities
Creating an Interview record (pending status).
#### Primary Team Owner
Radhika
#### Supporting Members
Muskaan
#### Development Phase
Phase 09
#### Testing Requirements
Form validation, resume upload acceptance.
#### Completion Criteria
Candidate can successfully configure all interview parameters and proceed to the interview room.

### M04 — Resume Processing
#### Purpose
Handles the uploaded resume to extract context for question generation.
#### Main Responsibilities
- Resume upload handling
- File validation (size/type)
- Resume storage reference
- Extracting/reading resume information
- Providing resume context for personalized questions
#### Primary User
System
#### Inputs
Resume file
#### Outputs
Parsed resume text/context, Storage URL/reference
#### Depends On
M03, M20
#### Used By
M05
#### Functional Requirements
FR-02, FR-03
#### Frontend Responsibilities
File upload progress UI.
#### Backend Responsibilities
Receiving file, validating, sending to storage, extracting text.
#### AI Responsibilities
None (or minor parsing if an LLM is used to extract entities, TBD).
#### Data Responsibilities
Updating Interview/User record with resume reference and context.
#### Primary Team Owner
Raisahib
#### Supporting Members
Radhika
#### Development Phase
Phase 09 (Frontend UI), Phase 17/18 (Backend integration)
#### Testing Requirements
File type rejection, text extraction accuracy.
#### Completion Criteria
System successfully extracts readable text from an uploaded resume and stores the file reference.

### M05 — Question Generation
#### Purpose
Dynamically creates relevant interview questions based on the candidate's setup.
#### Main Responsibilities
- Gathering candidate information, domain, difficulty, and resume context
- Prompt preparation
- LLM API request execution
- Receiving generated questions
- Response validation and formatting
#### Primary User
System
#### Inputs
Interview configuration, resume context
#### Outputs
List of structured interview questions
#### Depends On
M03, M04, M17
#### Used By
M06
#### Functional Requirements
FR-03
#### Frontend Responsibilities
Showing a loading state while questions are generated.
#### Backend Responsibilities
Prompt construction, API orchestration, response parsing.
#### AI Responsibilities
Generating high-quality, relevant questions using LLMs.
#### Data Responsibilities
Saving generated questions to the database.
#### Primary Team Owner
Raisahib
#### Supporting Members
None
#### Development Phase
Phase 18
#### Testing Requirements
Prompt effectiveness, JSON parsing of LLM output, handling LLM failures.
#### Completion Criteria
System reliably produces a set of valid, domain-appropriate questions based on the input configuration.

### M06 — Interview Session
#### Purpose
Orchestrates the active mock interview experience.
#### Main Responsibilities
- Displaying one question at a time
- Question counter management
- Interview timer management
- Answer submission handling
- Navigation to the next question
- Interview completion handling
- Exit/confirmation behavior
#### Primary User
Candidate
#### Inputs
Generated questions list
#### Outputs
Candidate answers per question, interview completion signal
#### Depends On
M05, M16
#### Used By
M07, M08
#### Functional Requirements
FR-04
#### Frontend Responsibilities
Interview room UI, timer, question rendering, navigation controls.
#### Backend Responsibilities
Session state tracking (if necessary), receiving submitted answers.
#### AI Responsibilities
None
#### Data Responsibilities
Updating Interview status to active/completed.
#### Primary Team Owner
Muskaan (Frontend), Raisahib (Integration/Backend)
#### Supporting Members
None
#### Development Phase
Phase 10
#### Testing Requirements
Timer accuracy, question navigation, premature exit handling.
#### Completion Criteria
Candidate can smoothly navigate through all questions and complete the interview session.

### M07 — Response Capture & Speech-to-Text
#### Purpose
Captures the candidate's answers in text or audio formats.
#### Main Responsibilities
- Text answer capture
- Audio response capture
- Recording state management (start, stop, pause)
- Speech-to-text conversion (Web Speech API / Whisper)
#### Primary User
Candidate
#### Inputs
User voice/typing
#### Outputs
Text transcript of the answer
#### Depends On
M06
#### Used By
M08
#### Functional Requirements
FR-04, FR-05
#### Frontend Responsibilities
Microphone permissions, recording UI, text area input.
#### Backend Responsibilities
Receiving audio files (if Whisper is used) and returning transcripts.
#### AI Responsibilities
Speech recognition (if Whisper is used).
#### Data Responsibilities
Saving raw transcripts/audio references to Response records.
#### Primary Team Owner
Raisahib
#### Supporting Members
Muskaan (Frontend Support)
#### Development Phase
Phase 10 (Frontend), Phase 18 (Backend Speech Integration)
#### Testing Requirements
Microphone access handling, transcription accuracy, fallback to text.
#### Completion Criteria
Candidate's spoken or typed answer is successfully captured and converted to a text string for evaluation.

### M08 — AI Response Evaluation
#### Purpose
Analyzes and scores the candidate's answers using AI.
#### Main Responsibilities
- Providing question context and candidate answer to the LLM
- Applying an evaluation rubric
- Assessing relevance, depth, clarity, and technical accuracy
- Generating a score
- Generating constructive feedback
#### Primary User
System
#### Inputs
Question text, candidate transcript
#### Outputs
Score, categorized feedback
#### Depends On
M07, M17
#### Used By
M09
#### Functional Requirements
FR-06
#### Frontend Responsibilities
None directly (displays loading state).
#### Backend Responsibilities
Prompt construction for evaluation, LLM request handling, parsing results.
#### AI Responsibilities
Scoring and feedback generation.
#### Data Responsibilities
Saving evaluation results to Response/Report records.
#### Primary Team Owner
Raisahib
#### Supporting Members
None
#### Development Phase
Phase 19
#### Testing Requirements
Rubric consistency, LLM hallucination prevention, score normalization.
#### Completion Criteria
Every submitted answer receives a valid score and structured feedback based on the defined criteria.

### M09 — Performance Report
#### Purpose
Aggregates evaluation data into a comprehensive feedback report.
#### Main Responsibilities
- Calculating overall score
- Displaying per-question evaluation
- Identifying and summarizing strengths
- Identifying and summarizing weaknesses
- Providing improvement suggestions
#### Primary User
Candidate
#### Inputs
Evaluation results for all questions in a session
#### Outputs
Final report data structure and UI
#### Depends On
M08
#### Used By
Candidate
#### Functional Requirements
FR-07
#### Frontend Responsibilities
Rendering charts, scorecards, and feedback sections.
#### Backend Responsibilities
Aggregating data and generating the final report object.
#### AI Responsibilities
Generating overall summary (optional).
#### Data Responsibilities
Saving the final Report record.
#### Primary Team Owner
Muskaan (Frontend), Raisahib (AI/Backend)
#### Supporting Members
Radhika
#### Development Phase
Phase 11 (Frontend), Phase 19 (Backend)
#### Testing Requirements
Score calculations, data visualization accuracy.
#### Completion Criteria
Candidate receives a clear, comprehensive report containing overall performance and specific feedback upon interview completion.

### M10 — Interview History
#### Purpose
Allows candidates to review their past interviews and reports.
#### Main Responsibilities
- Listing previous interviews (dates, domains, difficulties, scores)
- Providing access to past reports
#### Primary User
Candidate
#### Inputs
Candidate ID
#### Outputs
List of historical interview records
#### Depends On
M09, M19
#### Used By
Candidate
#### Functional Requirements
FR-08
#### Frontend Responsibilities
History table/list UI, pagination/filtering.
#### Backend Responsibilities
Fetching historical data for the user.
#### AI Responsibilities
None
#### Data Responsibilities
Reading Interview and Report records.
#### Primary Team Owner
Muskaan
#### Supporting Members
Raisahib (Backend/Data Support)
#### Development Phase
Phase 12
#### Testing Requirements
Data retrieval accuracy, empty state handling.
#### Completion Criteria
Candidate can view a chronological list of all past interviews and revisit their reports.

### M11 — Progress Tracking
#### Purpose
Provides visual insights into the candidate's improvement over time.
#### Main Responsibilities
- Tracking historical scores
- Visualizing performance trends
- Analyzing domain-wise performance
- Displaying progress visualizations
#### Primary User
Candidate
#### Inputs
Historical interview data
#### Outputs
Analytics data and charts
#### Depends On
M10
#### Used By
Candidate
#### Functional Requirements
FR-08
#### Frontend Responsibilities
Rendering progress charts and trend indicators.
#### Backend Responsibilities
Aggregating historical data into trend metrics.
#### AI Responsibilities
None
#### Data Responsibilities
Complex querying of historical records.
#### Primary Team Owner
Muskaan
#### Supporting Members
None
#### Development Phase
Phase 12
#### Testing Requirements
Chart rendering, accurate aggregation of trend data.
#### Completion Criteria
Candidate can view meaningful charts reflecting their score progression and domain strengths.

### M12 — Admin Dashboard
#### Purpose
Provides the landing experience for platform administrators.
#### Main Responsibilities
- Platform overview
- Basic usage statistics
- Navigation to management sections
#### Primary User
Admin
#### Inputs
Platform-wide aggregated data
#### Outputs
Admin UI and navigation
#### Depends On
M01, M16
#### Used By
Admin
#### Functional Requirements
FR-09
#### Frontend Responsibilities
Dashboard layout and statistics widgets for admins.
#### Backend Responsibilities
Fetching platform-wide aggregates securely.
#### AI Responsibilities
None
#### Data Responsibilities
Reading aggregated usage data.
#### Primary Team Owner
Rakshit
#### Supporting Members
Radhika
#### Development Phase
Phase 13
#### Testing Requirements
Admin-only route protection, widget data accuracy.
#### Completion Criteria
Admin can log in and view a high-level overview of platform activity.

### M13 — User Management
#### Purpose
Allows administrators to manage platform users.
#### Main Responsibilities
- Viewing the user list
- Searching and filtering users
- Managing user accounts
- Role-aware administration
#### Primary User
Admin
#### Inputs
Admin actions, search queries
#### Outputs
Updated user records, user lists
#### Depends On
M12, M19
#### Used By
Admin
#### Functional Requirements
FR-09
#### Frontend Responsibilities
User data table, search bars, action modals.
#### Backend Responsibilities
User management endpoints (list, update, delete).
#### AI Responsibilities
None
#### Data Responsibilities
Reading and updating User records.
#### Primary Team Owner
Rakshit
#### Supporting Members
Raisahib (Backend Support)
#### Development Phase
Phase 13
#### Testing Requirements
Search functionality, action authorization (admin only).
#### Completion Criteria
Admin can successfully search for a user and view/manage their details.

### M14 — Question Bank Management
#### Purpose
Allows administrators to manage the repository of interview questions.
#### Main Responsibilities
- Viewing cached/curated questions
- Filtering by domain and difficulty
- Managing questions
- Admin access control
#### Primary User
Admin
#### Inputs
Admin actions
#### Outputs
Updated question bank
#### Depends On
M12, M19
#### Used By
Admin
#### Functional Requirements
FR-09
#### Frontend Responsibilities
Question data table, filters, management UI.
#### Backend Responsibilities
Question management API endpoints.
#### AI Responsibilities
None
#### Data Responsibilities
Reading and updating Question records.
#### Primary Team Owner
Rakshit
#### Supporting Members
Raisahib (Backend/AI Support)
#### Development Phase
Phase 13
#### Testing Requirements
Table rendering, filtering accuracy.
#### Completion Criteria
Admin can view and manage the system's pool of questions.

### M15 — Platform Analytics
#### Purpose
Provides administrators with deeper insights into platform usage.
#### Main Responsibilities
- Displaying basic platform usage metrics
- Tracking interview activity
- Tracking user activity where appropriate
#### Primary User
Admin
#### Inputs
Platform database records
#### Outputs
Analytics reports and visualizations
#### Depends On
M12, M19
#### Used By
Admin
#### Functional Requirements
FR-09
#### Frontend Responsibilities
Analytics charts and data tables.
#### Backend Responsibilities
Analytics aggregation queries.
#### AI Responsibilities
None
#### Data Responsibilities
Reading and aggregating system-wide data.
#### Primary Team Owner
Rakshit
#### Supporting Members
Raisahib
#### Development Phase
Phase 13
#### Testing Requirements
Data aggregation accuracy, chart rendering.
#### Completion Criteria
Admin can view basic, accurate metrics regarding overall platform utilization.

### M16 — Shared UI & Application Infrastructure
#### Purpose
Provides the foundational building blocks for the frontend application.
#### Main Responsibilities
- Reusable UI components (buttons, inputs, cards, modals)
- Layouts and navigation structures
- Routing mechanisms
- Loaders, error states, empty states
- Common forms and responsive behavior
#### Primary User
System/Developers
#### Inputs
Component props
#### Outputs
Rendered UI elements
#### Depends On
None
#### Used By
All frontend modules
#### Functional Requirements
None directly (supports all)
#### Frontend Responsibilities
Implementation of the design system in React/Tailwind.
#### Backend Responsibilities
None
#### AI Responsibilities
None
#### Data Responsibilities
None
#### Primary Team Owner
Raisahib (Architecture)
#### Supporting Members
Muskaan, Rakshit (Implementation Support)
#### Development Phase
Phase 06, Phase 14
#### Testing Requirements
Component rendering, prop validation, responsiveness.
#### Completion Criteria
A complete set of robust, reusable components is available for constructing all application pages.

### M17 — AI / External Service Integration Layer
#### Purpose
Abstracts and manages all communication with external AI providers.
#### Main Responsibilities
- Gemini/OpenAI integration
- External AI request handling
- Validation of AI responses
- Retries and error handling
- API key security
- Future provider fallback (if required)
#### Primary User
System
#### Inputs
Internal system requests (prompts)
#### Outputs
Validated AI responses (JSON/Text)
#### Depends On
None
#### Used By
M05, M08
#### Functional Requirements
FR-03, FR-06
#### Frontend Responsibilities
None
#### Backend Responsibilities
API client implementation, rate limiting, error handling.
#### AI Responsibilities
Core interface to LLMs.
#### Data Responsibilities
None directly.
#### Primary Team Owner
Raisahib
#### Supporting Members
None
#### Development Phase
Phase 18, Phase 19
#### Testing Requirements
Network failure handling, malformed response parsing, API key security.
#### Completion Criteria
The backend can reliably communicate with the chosen LLM API and gracefully handle edge cases.

### M18 — Backend API Layer
#### Purpose
Provides the core server infrastructure and REST API for the frontend.
#### Main Responsibilities
- Express server setup
- Route definitions
- Controllers and services orchestration
- Middleware implementation
- Request validation
- API error handling
#### Primary User
System/Frontend
#### Inputs
HTTP Requests
#### Outputs
HTTP Responses (JSON)
#### Depends On
M19
#### Used By
All frontend modules
#### Functional Requirements
All backend-dependent FRs
#### Frontend Responsibilities
None
#### Backend Responsibilities
All server-side routing and business logic execution.
#### AI Responsibilities
None directly.
#### Data Responsibilities
Orchestrating data flow to/from M19.
#### Primary Team Owner
Raisahib
#### Supporting Members
None
#### Development Phase
Phase 15, Phase 16
#### Testing Requirements
Endpoint testing, error handling, validation logic.
#### Completion Criteria
A secure, running Node.js/Express server is exposing validated endpoints for frontend consumption.

### M19 — Database & Data Management Layer
#### Purpose
Handles all persistent data storage for the application.
#### Main Responsibilities
- Managing core entities (User, Interview, Question, Response, Report)
- Managing additional structures (prompt templates, etc.) if required
- Providing a data access layer (e.g., Mongoose ODM)
#### Primary User
System
#### Inputs
Data objects
#### Outputs
Database records
#### Depends On
None
#### Used By
M18
#### Functional Requirements
All data-dependent FRs
#### Frontend Responsibilities
None
#### Backend Responsibilities
Schema definition, database connection management, query execution.
#### AI Responsibilities
None
#### Data Responsibilities
Core persistence of the entire platform.
#### Primary Team Owner
Raisahib
#### Supporting Members
None
#### Development Phase
Phase 17
#### Testing Requirements
Schema validation, connection stability, query performance.
#### Completion Criteria
MongoDB is connected and schemas are successfully saving/retrieving data.

### M20 — File / Resume Storage Layer
#### Purpose
Manages the storage and retrieval of user-uploaded files.
#### Main Responsibilities
- Resume file handling
- File metadata/reference management
- Secure cloud storage (e.g., Cloudinary)
- File retrieval where required
#### Primary User
System
#### Inputs
File buffers/streams
#### Outputs
Storage URLs
#### Depends On
None
#### Used By
M04
#### Functional Requirements
FR-02
#### Frontend Responsibilities
None directly (UI uses M04).
#### Backend Responsibilities
Cloud storage SDK integration, file upload streaming.
#### AI Responsibilities
None
#### Data Responsibilities
Storing binary files and returning reference URLs.
#### Primary Team Owner
Raisahib
#### Supporting Members
None
#### Development Phase
Phase 17
#### Testing Requirements
Upload success, file size/type validation at storage layer.
#### Completion Criteria
Uploaded files are securely stored in the cloud provider and accessible via URL.

---

## 6. REQUIREMENT-TO-MODULE MATRIX

| Requirement | Module(s) | Primary Owner | Priority |
|---|---|---|---|
| FR-01 | M01, M02, M12 | Radhika, Raisahib | HIGH |
| FR-02 | M03, M04, M20 | Radhika, Raisahib | HIGH |
| FR-03 | M04, M05, M17 | Raisahib | HIGH |
| FR-04 | M06, M07 | Muskaan, Raisahib | HIGH |
| FR-05 | M07 | Raisahib | MEDIUM |
| FR-06 | M08, M17 | Raisahib | HIGH |
| FR-07 | M09 | Muskaan, Raisahib | HIGH |
| FR-08 | M10, M11 | Muskaan | MEDIUM |
| FR-09 | M12, M13, M14, M15 | Rakshit | LOW |

---

## 7. MODULE DEPENDENCY GRAPH

```text
Authentication
      ↓
Candidate Dashboard
      ↓
Interview Setup
      ↓
Resume Processing
      ↓
Question Generation
      ↓
Interview Session
      ↓
Response Capture
      ↓
AI Evaluation
      ↓
Performance Report
      ↓
History / Progress

[Shared Infrastructure Dependencies across all modules]
→ Backend API (M18)
→ Database (M19)
→ AI Integration (M17)
→ Storage (M20)
→ Shared UI (M16)
```

---

## 8. FRONTEND MODULE → PAGE MAPPING

| Module | Page / Screen | Primary Owner |
|---|---|---|
| M16 | Landing Page | Raisahib / Rakshit |
| M01 | Login | Radhika |
| M01 | Signup | Radhika |
| M01 | Forgot/Reset Password | Radhika |
| M02 | Candidate Dashboard | Muskaan |
| M03 | Interview Setup | Radhika |
| M04 | Resume Upload/Preview (Component) | Radhika / Raisahib |
| M06, M07 | Interview Room | Muskaan |
| M06 | Interview Completion (Component) | Muskaan |
| M09 | Performance Report | Muskaan |
| M10 | Interview History | Muskaan |
| M11 | Progress Analytics | Muskaan |
| M01, M16 | Profile/Settings (Component) | Radhika |
| M12 | Admin Dashboard | Rakshit |
| M13 | User Management | Rakshit |
| M14 | Question Bank Management | Rakshit |

---

## 9. FRONTEND → BACKEND → AI → DATABASE BOUNDARIES

| Layer | Responsibility |
|---|---|
| **Frontend** | UI, user input, navigation, display results |
| **Backend** | Business logic, authentication, validation, API orchestration |
| **AI** | Question generation, response evaluation |
| **Database** | Users, interviews, questions, responses, reports |
| **Storage** | Resumes/files |

---

## 10. TEAM OWNERSHIP MAP

| Team Member | Primary Modules | Supporting Modules |
|---|---|---|
| **Raisahib** | M04, M05, M07, M08, M16, M17, M18, M19, M20 | M01, M06, M09, M10, M13, M14, M15 |
| **Radhika** | M01, M03 | M04, M09, M12 |
| **Muskaan** | M02, M06, M09, M10, M11 | M03, M07, M16 |
| **Rakshit** | M12, M13, M14, M15 | M02, M16 |

---

## 11. DEVELOPMENT PHASE MAPPING

- **M01 (Auth):** Phase 07, Phase 16
- **M02 (Dashboard):** Phase 08
- **M03 (Setup):** Phase 09
- **M04 (Resume):** Phase 09, Phase 17
- **M05 (Question Gen):** Phase 18
- **M06 (Interview Session):** Phase 10
- **M07 (Response Capture):** Phase 10, Phase 18
- **M08 (AI Evaluation):** Phase 19
- **M09 (Performance Report):** Phase 11, Phase 19
- **M10 (Interview History):** Phase 12, Phase 17
- **M11 (Progress Tracking):** Phase 12, Phase 17
- **M12 (Admin Dashboard):** Phase 13
- **M13 (User Management):** Phase 13
- **M14 (Question Bank):** Phase 13
- **M15 (Platform Analytics):** Phase 13
- **M16 (Shared UI):** Phase 06, Phase 14
- **M17 (AI Integration):** Phase 18, Phase 19
- **M18 (Backend API):** Phase 15, Phase 16
- **M19 (Database):** Phase 17
- **M20 (Storage):** Phase 17

---

## 12. MODULE COMPLETION CHECKLIST

- [ ] M01 — Authentication & Authorization (Not Started)
- [ ] M02 — Candidate Dashboard (Not Started)
- [ ] M03 — Interview Setup (Not Started)
- [ ] M04 — Resume Processing (Not Started)
- [ ] M05 — Question Generation (Not Started)
- [ ] M06 — Interview Session (Not Started)
- [ ] M07 — Response Capture & Speech-to-Text (Not Started)
- [ ] M08 — AI Response Evaluation (Not Started)
- [ ] M09 — Performance Report (Not Started)
- [ ] M10 — Interview History (Not Started)
- [ ] M11 — Progress Tracking (Not Started)
- [ ] M12 — Admin Dashboard (Not Started)
- [ ] M13 — User Management (Not Started)
- [ ] M14 — Question Bank Management (Not Started)
- [ ] M15 — Platform Analytics (Not Started)
- [ ] M16 — Shared UI & Application Infrastructure (Not Started)
- [ ] M17 — AI / External Service Integration Layer (Not Started)
- [ ] M18 — Backend API Layer (Not Started)
- [ ] M19 — Database & Data Management Layer (Not Started)
- [ ] M20 — File / Resume Storage Layer (Not Started)

---

## 13. DESIGN DECISIONS / PENDING DECISIONS

The following technical decisions should **NOT** be finalized yet and are marked as pending:

- **PENDING:** Exact resume parsing library (TO BE DECIDED DURING SYSTEM DESIGN / IMPLEMENTATION)
- **PENDING:** Exact speech-to-text implementation (Web Speech API vs. Whisper) (TO BE DECIDED DURING SYSTEM DESIGN / IMPLEMENTATION)
- **PENDING:** Exact LLM provider priority (Gemini vs. OpenAI) (TO BE DECIDED DURING SYSTEM DESIGN / IMPLEMENTATION)
- **PENDING:** Exact API endpoint naming conventions (TO BE DECIDED DURING SYSTEM DESIGN / IMPLEMENTATION)
- **PENDING:** Exact MongoDB schema fields and structures (TO BE DECIDED DURING SYSTEM DESIGN / IMPLEMENTATION)
- **PENDING:** Exact charting library for analytics and progress tracking (TO BE DECIDED DURING SYSTEM DESIGN / IMPLEMENTATION)

---

## 14. PHASE 02 COMPLETION CRITERIA

Phase 02 can only be considered complete when:

- [ ] All modules are defined
- [ ] Module responsibilities are defined
- [ ] Inputs/outputs are defined
- [ ] Dependencies are defined
- [ ] Requirement mapping is complete
- [ ] Page mapping is complete
- [ ] Team ownership is complete
- [ ] Layer boundaries are clear
- [ ] Phase mapping is complete
- [ ] Pending technical decisions are documented
