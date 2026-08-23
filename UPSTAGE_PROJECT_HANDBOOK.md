# UPSTAGE — Project Handbook
## AI-Powered Mock Interview Platform

> **Purpose of this handbook:** This is the master reference for the complete development of UPSTAGE.  
> It should be kept in the root of the project and updated throughout development.

---

# 1. Project Identity

**Project Name:** UPSTAGE  
**Project Title:** UPSTAGE: AI-Powered Mock Interview Platform

The project is a full-stack web application designed to help students and job-seekers practice interviews in a realistic and personalized way.

The documented project uses Large Language Models (LLMs) to:
- generate domain-specific interview questions,
- evaluate candidate responses,
- provide scores and structured feedback,
- identify strengths and weaknesses,
- provide improvement suggestions,
- generate performance reports.

The project documentation describes the stack as MERN with an integrated AI layer.

---

# 2. Source Documents

The following project documents are the primary reference for the existing UPSTAGE definition:

1. **BEE final PPT.pptx**
2. **BEE_REPORT(2).docx**
3. **BEE_ABSTRACT.pdf**
4. **ST-II guideline/notice provided by the team**

### Source-of-truth rule

When developing UPSTAGE:

- Do not silently change the project name.
- Do not replace documented modules with unrelated modules.
- Do not invent features and present them as already implemented.
- If a new feature is proposed, clearly mark it as **planned / future / enhancement** until approved.
- If documentation and implementation differ, update the project documentation after the team agrees on the change.

---

# 3. Current Documented Technology Stack

## Frontend
- React.js
- Vite
- Tailwind CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose ODM

## Authentication
- JWT
- bcryptjs

## Real-Time Communication
- Socket.io

## Cloud Storage
- Cloudinary

## State Management
- TanStack Query
- Zustand

## AI Integration
- Google Gemini API
- OpenAI API

## Speech-to-Text
- Web Speech API
- Whisper

Do not install every technology immediately. Use a technology only when the corresponding feature requires it.

---

# 4. Documented Core Modules

The existing project documentation defines these modules:

1. Authentication
2. Interview Setup
3. Question Generation
4. Response Capture
5. Evaluation
6. Report
7. Interview History & Progress Tracking
8. Admin Dashboard

### Authentication
- Signup
- Login
- Password hashing
- JWT-based session management
- Candidate/Admin role access

### Interview Setup
- Domain selection
- Difficulty selection
- Resume upload
- Duration configuration

### Question Generation
- Candidate profile
- Domain
- Difficulty
- Resume information
- LLM-generated questions

### Response Capture
- Text answers
- Audio answers
- Speech-to-text

### Evaluation
The documented evaluation criteria include:
- relevance
- depth
- clarity
- technical accuracy

### Report
- Overall score
- Per-question scores
- Strengths
- Weaknesses
- Improvement suggestions

### History & Progress
- Previous interviews
- Scores
- Progress tracking

### Admin
- Platform usage analytics
- User management
- Question-bank curation

---

# 5. Documented System Architecture

UPSTAGE follows a layered architecture:

```text
React Frontend
      |
      v
Node.js + Express API Layer
      |
      +--------------------+
      |                    |
      v                    v
AI / Speech Services     MongoDB
      |                    |
      +--------------------+
               |
               v
        Cloud/Object Storage
```

The documented architecture separates:
- presentation layer,
- application/API layer,
- AI layer,
- data layer.

The exact implementation may evolve during development, but the separation of responsibilities should remain clear.

---

# 6. Documented Database Model

The report identifies these core relationships:

```text
User
  |
  | 1 : N
  v
Interview
  |
  | 1 : N
  v
Question
  |
  | 1 : 1
  v
Response

Interview
  |
  | 1 : 1
  v
Report
```

Core data includes:
- user profiles,
- interview sessions,
- questions,
- responses,
- evaluation scores,
- reports.

Additional structures such as prompt templates/question-bank data may be introduced where required by the documented design.

---

# 7. Documented Interview Flow

```text
User Login
    |
    v
Interview Setup
    |
    +--> Select Domain
    +--> Select Difficulty
    +--> Select Duration
    +--> Upload Resume
    |
    v
Generate Questions
    |
    v
Interview Session
    |
    +--> Display Question
    +--> Capture Text/Audio Answer
    +--> Submit Answer
    |
    v
AI Evaluation
    |
    +--> Score
    +--> Feedback
    |
    v
Next Question
    |
    v
Final Report
    |
    +--> Overall Score
    +--> Strengths
    +--> Weaknesses
    +--> Suggestions
    |
    v
History / Progress
```

---

# 8. Documented DFD Structure

## Level 0
External entities:
- Candidate
- Admin
- AI / LLM API

The complete UPSTAGE platform is represented as the central system.

## Level 1

Major processes:

1.0 User Authentication  
2.0 Interview Setup  
3.0 Question Generation  
4.0 Response Evaluation  
5.0 Report Generation

Documented data stores include:
- User Database
- Question Bank
- Interview Responses
- Feedback & Scores

## Level 2 — Question Generation

```text
3.1 Parse Resume & Domain Input
            |
            v
3.2 Build Prompt Template
            |
            v
3.3 Call LLM API
            |
            v
3.4 Parse & Validate Response
```

A prompt-template data store is introduced at this level.

---

# 9. Planned Application Pages

The documents do not prescribe an exact route count. The following is the implementation plan for the working software.

## Public

### 1. Landing Page
- UPSTAGE introduction
- Main call-to-action
- How it works
- Features
- Benefits

### 2. Login
- Email
- Password
- Login
- Forgot password
- Signup navigation

### 3. Signup
- Name
- Email
- Password
- Confirm password

### 4. Forgot / Reset Password
- Password recovery flow

---

## Candidate

### 5. Candidate Dashboard
- Welcome section
- Start interview
- Recent interviews
- Latest score
- Quick statistics

### 6. Interview Setup
- Domain
- Difficulty
- Duration
- Resume upload
- Start interview

### 7. Resume Upload / Preview
- Upload
- Preview
- Replace/remove resume
- Parsed information preview when backend is available

### 8. Interview Room
- Question
- Question number
- Timer
- Text answer
- Audio answer
- Recording status
- Submit
- Next

### 9. Interview Completion
- Completion message
- Link to report

### 10. Performance Report
- Overall score
- Per-question scores
- Strengths
- Weaknesses
- Suggestions

### 11. Interview History
- Previous sessions
- Domain
- Difficulty
- Date
- Score
- View report

### 12. Progress Analytics
- Score progression
- Domain performance
- Difficulty performance
- Other useful progress information

### 13. Profile / Settings
- User details
- Preferences
- Account settings
- Logout

---

## Admin

### 14. Admin Dashboard
- Platform statistics
- User count
- Interview usage
- Basic analytics

### 15. User Management
- Search users
- View users
- Manage users

### 16. Question Bank Management
- View questions
- Domain
- Difficulty
- Manage cached/curated questions

Some small flows such as password reset or resume preview may be implemented as separate screens or embedded sections rather than separate routes.

---

# 10. Reusable Frontend Components

Planned reusable components include:

```text
components/
├── common/
│   ├── Button
│   ├── Input
│   ├── Select
│   ├── Modal
│   ├── Badge
│   ├── Loader
│   ├── EmptyState
│   └── ErrorState
│
├── auth/
├── dashboard/
├── interview/
├── report/
└── admin/
```

Examples:
- Navbar
- Sidebar
- Button
- Input
- Select
- Card
- Modal
- Toast
- Loader
- ScoreCard
- InterviewCard
- QuestionCard
- ProgressBar
- AudioRecorder
- ResumeUploader
- DomainCard
- DifficultyCard
- ReportSection
- Chart
- ConfirmationModal

Only create components when they are actually needed.

---

# 11. Team Ownership

## TM1 — Raisahib
### Role: Technical Lead / Full-Stack & AI Lead

Primary ownership:
- Overall architecture
- React architecture decisions
- Backend
- API integration
- Database integration
- Authentication architecture
- Interview engine
- AI integration
- Final integration
- Deployment

Primary technical areas:
- services
- state management
- routes
- backend
- AI services
- database
- integration

---

## TM2 — Radhika Aggarwal
### Role: System Design & Technical Documentation Lead

Primary ownership:
- Requirement analysis
- Functional requirements
- Non-functional requirements
- User flows
- System design
- DFD
- ER diagram
- API documentation
- Authentication UI
- Interview setup UI
- Testing documentation

Primary frontend/documentation areas:
- auth pages
- interview setup
- system-design documentation
- test cases

---

## TM3 — Muskaan
### Role: Frontend Implementation & UI Testing

Primary ownership:
- Candidate dashboard
- Interview room UI
- Question card
- Answer interface
- Timer
- Loading/error states
- Report UI
- History UI
- Progress UI
- Responsive UI testing

Primary frontend areas:
- dashboard
- interview
- report
- history
- progress

---

## TM4 — Rakshit Thareja
### Role: Common UI Components, Admin UI & QA Support

Primary ownership:
- Common reusable components
- Basic admin dashboard UI
- User table
- Question table
- Search/filter UI
- Basic QA
- Navigation/form testing
- README/setup documentation support
- Screenshots and documentation support

Primary frontend areas:
- common components
- admin UI
- QA/documentation support

---

# 12. Coding & Learning Rules

These rules apply to the entire project.

## Beginner-first implementation

The code must be:
- readable,
- simple,
- explainable,
- modular without unnecessary abstraction.

Do not use advanced patterns merely to make the project look sophisticated.

## Comments

Important files should begin with a short comment describing:
- what the file handles,
- why it exists,
- where it is used.

Important functions/components should have comments explaining meaningful logic.

Do NOT comment every trivial line.

Bad:

```js
// create a variable
const name = "UPSTAGE";
```

Good:

```js
// Stores the currently selected interview domain.
// This value is used when preparing the interview configuration.
const selectedDomain = "DSA";
```

## Explainability rule

Every major feature should be explainable by its owner.

If code is too complex for the assigned member to explain:
1. simplify it,
2. add a clear explanation,
3. only then continue.

## No unnecessary rewriting

Do not rewrite working code unless:
- there is a bug,
- the architecture requires it,
- the requirement changed,
- or the current implementation blocks a later feature.

## No fake functionality

If backend/AI is not ready:
- use clearly separated mock/static data,
- do not pretend a real API is connected.

---

# 13. Development Method

UPSTAGE will NOT be generated as one giant application in one step.

Use this cycle:

```text
Plan
  ↓
Implement one small feature
  ↓
Run the project
  ↓
Test the feature
  ↓
Understand the code
  ↓
Fix problems
  ↓
Update handbook
  ↓
Commit
  ↓
Move to next feature
```

Every phase must end with a working state.

---

# 14. Twenty-Phase Master Roadmap

> The 20-phase structure below is the team's development plan. It is a detailed implementation breakdown created from the documented project scope and ST-II requirements; it is not a claim that the source documents themselves prescribed exactly these 20 phases.

---

## PHASE 01 — Project Requirement Analysis

### Goal
Freeze exactly what UPSTAGE must solve.

### Tasks
- Problem statement
- Target users
- Candidate workflow
- Admin workflow
- Functional requirements
- Non-functional requirements
- User roles
- Scope
- Out-of-scope items
- Feature priority

### Primary Owner
Radhika

### Support
Raisahib

### Completion
Requirement document reviewed and approved.

---

## PHASE 02 — Functional Module Breakdown

### Goal
Divide UPSTAGE into understandable modules.

### Modules
- Authentication
- Dashboard
- Interview Setup
- Resume
- Question Generation
- Interview Room
- Response Capture
- Evaluation
- Report
- History
- Progress
- Admin

### Primary Owner
Raisahib

### Support
Radhika

### Completion
Module dependency map created.

---

## PHASE 03 — User Flows & Application Flow

### Goal
Define how users move through the application.

### Deliverables
- Candidate flow
- Admin flow
- Authentication flow
- Interview flow
- Report flow
- Error/exit flows

### Primary Owner
Radhika

### Support
Raisahib + Muskaan

---

## PHASE 04 — Technical Architecture & Folder Structure

### Goal
Freeze the implementation architecture before large-scale coding.

### Tasks
- Frontend structure
- Backend structure
- API responsibility
- Service responsibility
- State management plan
- Database responsibility
- AI service responsibility

### Primary Owner
Raisahib

### Support
Radhika

---

## PHASE 05 — UI/UX & Design System

### Goal
Create one consistent visual system.

### Tasks
- Colors
- Typography
- Buttons
- Forms
- Cards
- Navigation
- Feedback states
- Responsive rules

### Primary Owner
Muskaan

### Support
Radhika + Raisahib

---

## PHASE 06 — React App Shell & Routing

### Goal
Create the frontend skeleton.

### Tasks
- React/Vite setup
- Tailwind setup
- Main layout
- Public layout
- Candidate layout
- Admin layout
- Routing
- Basic navigation

### Primary Owner
Raisahib

### Support
Muskaan

---

## PHASE 07 — Authentication Frontend

### Goal
Build the authentication experience.

### Screens
- Login
- Signup
- Forgot password
- Reset password

### Primary Owner
Radhika

### Support
Raisahib

### Note
Backend authentication is not required at this stage.

---

## PHASE 08 — Candidate Dashboard

### Goal
Build the main candidate home experience.

### Features
- Welcome
- Start interview
- Recent interviews
- Latest score
- Quick statistics

### Primary Owner
Muskaan

### Support
Rakshit

---

## PHASE 09 — Interview Setup & Resume UI

### Goal
Build the configuration screen.

### Features
- Domain
- Difficulty
- Duration
- Resume upload
- Resume preview
- Validation
- Start interview

### Primary Owner
Radhika

### Support
Muskaan

---

## PHASE 09 — Interview Room UI - COMPLETED

### Goal
Build the core interview experience frontend foundation.

### Features
- Interview Room layout
- Timer
- Question navigation
- Answer area
- Interview controls
- UI states
- Completion screen
- Responsive design

### Primary Owner
Muskaan

### Support
Raisahib

---

## PHASE 11 — Report & Results UI

### Goal
Create the complete feedback experience.

### Features
- Overall score
- Question-wise scores
- Strengths
- Weaknesses
- Suggestions
- Evaluation categories

### Primary Owner
Muskaan

### Support
Radhika

---

## PHASE 12 — History & Progress UI

### Goal
Allow candidates to track improvement.

### Features
- Interview history
- Score history
- Domain history
- Progress charts
- Report access

### Primary Owner
Muskaan

### Support
Raisahib

---

## PHASE 13 — Admin Frontend

### Goal
Build admin-side interfaces.

### Features
- Dashboard
- User management
- Question bank
- Search/filter
- Basic analytics

### Primary Owner
Rakshit

### Support
Radhika

---

## PHASE 14 — Common Components & Frontend Polish

### Goal
Make the frontend consistent and maintainable.

### Tasks
- Common buttons
- Inputs
- Cards
- Modals
- Loaders
- Empty states
- Error states
- Responsive fixes
- Accessibility basics

### Primary Owner
Rakshit

### Support
Muskaan + Raisahib

---

## PHASE 15 — Initial Backend Foundation

### Goal
Create the backend foundation.

### Tasks
- Node setup
- Express
- Environment configuration
- Basic server
- Route structure
- Error handling
- Controller/service structure

### Primary Owner
Raisahib

### Support
Radhika

---

## PHASE 16 — Authentication, User & Interview APIs

### Goal
Connect the core backend workflows.

### Tasks
- Signup API
- Login API
- JWT
- bcrypt
- User model
- Interview model
- Protected routes
- Role handling

### Primary Owner
Raisahib

### Support
Radhika

---

## PHASE 17 — Database & Interview Engine

### Goal
Connect MongoDB and implement interview data flow.

### Tasks
- MongoDB Atlas
- Mongoose
- Questions
- Responses
- Reports
- Interview history
- Data relationships
- Resume/file references

### Primary Owner
Raisahib

### Support
Radhika

---

## PHASE 18 — AI Question Generation & Speech

### Goal
Introduce the AI interview engine.

### Question Generation
- Candidate profile
- Resume
- Domain
- Difficulty
- Prompt template
- LLM API
- Structured output
- Validation/retry

### Speech
- Web Speech API
- Whisper where required by the final architecture

### Primary Owner
Raisahib

### Support
Radhika

---

## PHASE 19 — AI Evaluation & Report Engine

### Goal
Complete the intelligent evaluation pipeline.

### Flow

```text
Question
+
Candidate Answer
+
Scoring Rubric
       ↓
LLM
       ↓
Score
+
Feedback
       ↓
Report
```

### Evaluation
- Relevance
- Depth
- Clarity
- Technical accuracy

### Reliability
- Fixed rubric
- Output validation
- Retry
- Context control
- Caching/fallback where required

### Primary Owner
Raisahib

### Support
Radhika

---

## PHASE 20 — Full Integration, Testing, Deployment & Finalization

### Goal
Turn the complete project into a stable final product.

### Testing
- Authentication
- Interview setup
- Resume
- Question generation
- Answer capture
- AI evaluation
- Database
- Reports
- History
- Admin
- Responsive UI
- Error handling

### Finalization
- Bug fixing
- Security review
- Performance review
- Deployment
- README
- Final report
- PPT
- Screenshots
- DFD
- Architecture
- Viva preparation

### Primary Owner
Raisahib

### Support
All members

---

# 15. ST-II Milestone

The ST-II work should be tracked separately inside the roadmap.

## Required scope

### Phase 01
Requirement Analysis

### Phase 02
System Design / Architecture

### Phase 03
Frontend Development

### GitHub
- Repository setup
- Folder structure
- README
- Team interaction/contribution

The team should aim to have a working interactive React/JavaScript frontend for the ST-II evaluation.

### ST-II completion checkpoint

```text
[ ] Requirement Analysis completed
[ ] System Design completed
[ ] UI/UX plan completed
[ ] React project created
[ ] Routing/layout completed
[ ] Core frontend pages completed
[ ] Interactive UI completed
[ ] GitHub repository created
[ ] README started
[ ] Team module ownership documented
[ ] Current code tested
```

---

# 16. GitHub Ownership Strategy

Do not create fake commits.

Each member should contribute to the module they own.

Suggested ownership:

```text
Raisahib
- architecture
- app shell
- services
- state
- backend
- AI
- database
- integration

Radhika
- auth UI
- interview setup
- system design docs
- API documentation
- testing documentation

Muskaan
- dashboard
- interview room
- report
- history
- progress

Rakshit
- common components
- admin UI
- QA
- README/support documentation
```

The final repository should remain professionally structured rather than creating separate top-level folders named after every team member.

---

# 17. Progress Tracking Format

At the end of every phase, update this handbook.

Use:

```text
Status:
NOT STARTED / IN PROGRESS / COMPLETED / BLOCKED

Completed:
- ...

Files Created:
- ...

Files Modified:
- ...

Features Working:
- ...

Testing:
- ...

Known Issues:
- ...

What We Learned:
- ...

Next Phase:
- ...
```

---

# 18. Current Status

## Overall Project

**Status:** IN PROGRESS

## Current Phase

**Phase 06 — Frontend Application Shell & Routing**
Status: IN PROGRESS

Phase 06 currently includes:
- frontend application shell
- React routing
- public layout
- auth layout
- candidate layout
- admin layout
- Landing Page
- Login UI
- Signup UI
- Candidate Dashboard shell
- Admin Dashboard shell

**Phase 05 — UI/UX & Design System**
Status: COMPLETED

**Phase 04 — Technical Architecture & Folder Structure**
Status: COMPLETED

**Phase 03 — User Flows & Application Flow**
Status: COMPLETED

**Phase 02 — Functional Module Breakdown**
Status: COMPLETED

**Phase 01 — Project Requirement Analysis**
Status: COMPLETED

## Completed

- Project identity finalized
- PPT reviewed
- Report reviewed
- Abstract reviewed
- Core modules identified
- Technology stack documented
- Team ownership planned
- 20-phase roadmap created
- Requirement analysis document created
- Requirement Analysis document reviewed and approved
- Functional Module Breakdown document created and approved
- User Flows and Application Flow document created and approved
- Technical Architecture document created and approved
- UI/UX design documentation
- Stitch design system extraction
- Tailwind design tokens
- Hanken Grotesk typography
- Reusable common components
- Basic layout foundations
- Loading/empty/error states
- Temporary design-system preview

## Files Created
- docs/requirements/REQUIREMENT_ANALYSIS.md
- docs/requirements/FUNCTIONAL_MODULE_BREAKDOWN.md
- docs/requirements/USER_FLOWS_AND_APPLICATION_FLOW.md
- docs/architecture/TECHNICAL_ARCHITECTURE.md
- docs/design/UI_UX_DESIGN_SYSTEM.md

## Next Phase
PHASE 06 — Environment Setup & Initialization

## Not Started

- Actual frontend coding
- Backend implementation
- Database implementation
- AI implementation
- Production integration

---

# 19. Antigravity Development Rules

Every future Antigravity prompt must follow these rules.

### Rule 1 — Work incrementally
Never ask Antigravity to build the entire project in one prompt.

### Rule 2 — Explain before modifying
Before making a major change, identify:
- files involved,
- purpose,
- expected result.

### Rule 3 — Beginner-friendly code
Use simple React and JavaScript.

### Rule 4 — Meaningful comments
Comments must explain important logic.

### Rule 5 — File responsibility
Important files should clearly state what they handle.

### Rule 6 — No unnecessary libraries
Only install dependencies that are actually required.

### Rule 7 — No unnecessary abstraction
Do not create complex architecture just for appearance.

### Rule 8 — Preserve working code
Do not rewrite unrelated modules.

### Rule 9 — Test after each feature
Run the application after meaningful changes.

### Rule 10 — Keep documentation synchronized
Update this handbook after completing a phase.

### Rule 11 — No fake backend/AI
Mock data is acceptable during frontend development, but it must be clearly separated and replaced later.

### Rule 12 — Code must be explainable
The member assigned to a module must understand its important code.

---

# 20. Master Development Philosophy

UPSTAGE should be built as a real student project that the team understands.

The objective is NOT:

> Generate the maximum amount of code as quickly as possible.

The objective is:

> Build a working system step-by-step, understand every important module, test it, document it, and integrate it into one complete product.

The final application should demonstrate:
- full-stack development,
- REST APIs,
- MongoDB modelling,
- authentication,
- prompt engineering,
- LLM integration,
- speech-to-text,
- interview workflow,
- evaluation,
- reporting,
- testing,
- deployment.

---

# 21. Final Product Definition

At completion, UPSTAGE should provide this complete flow:

```text
Candidate
   |
   v
Authentication
   |
   v
Dashboard
   |
   v
Interview Setup
   |
   +--> Domain
   +--> Difficulty
   +--> Duration
   +--> Resume
   |
   v
AI Question Generation
   |
   v
Interview Room
   |
   +--> Text Answer
   +--> Audio Answer
   |
   v
Speech-to-Text where applicable
   |
   v
AI Evaluation
   |
   +--> Relevance
   +--> Depth
   +--> Clarity
   +--> Technical Accuracy
   |
   v
Performance Report
   |
   +--> Score
   +--> Strengths
   +--> Weaknesses
   +--> Suggestions
   |
   v
History & Progress
```

Admin:

```text
Admin Login
   |
   v
Admin Dashboard
   |
   +--> Users
   +--> Analytics
   +--> Question Bank
```

---

# 22. Handbook Rule

This file is a living document.

Whenever a phase is completed:
1. Update its status.
2. Record completed features.
3. Record files/modules.
4. Record testing.
5. Record known issues.
6. Record what was learned.
7. Mark the next phase.

Do not delete the history of completed phases.

---

## Current Status Trackers

PHASE 07 — Authentication Foundation
Status: COMPLETED

PHASE 08 — Interview Setup & Configuration
Status: IN PROGRESS
Phase 08 currently includes:
- interview setup page
- interview configuration
- domain selection
- difficulty selection
- duration if supported
- configuration validation
- configuration summary
- protected interview setup route
- interview room placeholder
- dashboard to setup navigation

*Note: Actual AI interview functionality is NOT implemented yet.*

---

## END OF HANDBOOK
