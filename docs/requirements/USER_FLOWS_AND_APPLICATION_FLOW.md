# UPSTAGE — User Flows & Application Flow

## 1. Purpose

The purpose of documenting application flows before implementation is to ensure a predictable navigation and a clear user experience. By mapping out exactly how users move through the platform, we enable:

- **Easier frontend development:** The UI team knows exactly what pages and states to build.
- **Easier backend API planning:** The API team understands exactly what data is required at each step.
- **Easier testing:** QA can follow these defined flows to ensure the system behaves as expected.
- **Identification of edge cases:** Uncovering potential failure points before they become bugs in code.
- **Clear module dependencies:** Visually understanding how different parts of the system rely on one another.

---

## 2. USER ROLES

### Candidate
The candidate is a student or job seeker using the platform to practice mock interviews. They can set up interviews, answer questions using text or audio, receive AI-generated feedback and scores, and track their historical progress.

### Administrator
The administrator is responsible for managing the platform. They can view platform usage analytics, manage user accounts (candidates), and oversee the question bank to maintain system quality.

---

## 3. GLOBAL APPLICATION FLOW

```text
Landing Page
    ↓
Authentication
    ↓
Role Detection
    ↓
Candidate / Admin

Candidate:
Dashboard
    ↓
Interview Setup
    ↓
Resume
    ↓
Question Generation
    ↓
Interview Session
    ↓
Response Capture
    ↓
AI Evaluation
    ↓
Next Question / Completion
    ↓
Performance Report
    ↓
History / Progress

Admin:
Admin Dashboard
    ↓
User Management
    ↓
Question Bank
    ↓
Platform Analytics

Shared Services:
Frontend
    ↓
Backend API
    ↓
Database / AI / Storage
```

---

## 4. CANDIDATE — FIRST TIME USER FLOW

**Landing**
- User action: User visits the UPSTAGE landing page.
- System response: Renders marketing and intro content.
- Next destination: Signup

**Signup**
- User action: Candidate enters name, email, and password.
- System response: Validates input and creates account.
- Success: Candidate proceeds to the authenticated experience.
- Failure: Validation or error message is shown (e.g., email already exists).

**Login / Authenticated State**
- User action: User provides credentials or uses newly created session.
- System response: Verifies JWT/token.
- Next destination: Candidate Dashboard

**Candidate Dashboard**
- User action: Clicks "Start Interview".
- System response: Routes user to setup.
- Next destination: Interview Setup

**Interview Setup**
- User action: Selects Domain, Difficulty, Duration.
- System response: Stores selections in state.
- Next destination: Resume Upload

**Resume Upload**
- User action: Uploads PDF/Doc resume.
- System response: Validates file type/size.
- Success: Proceeds to Start Interview.
- Failure: Shows invalid file message.

**Start Interview**
- User action: Clicks Start.
- System response: Triggers backend to parse resume and prepare prompt.
- Next destination: Question Generation

**Question Generation**
- User action: Waits (loading state).
- System response: LLM API generates specific questions.
- Next destination: Interview Room

**Interview Room**
- User action: Begins answering the first question.
- System response: Starts timer and displays question text.

---

## 5. CANDIDATE — RETURNING USER FLOW

**Login**
- User action: Enters credentials.
- System response: Authenticates user.
- Next destination: Candidate Dashboard

**Candidate Dashboard**
- User action: Views recent interviews, latest score, and progress summary.
- System response: Fetches and displays historical data.
- Next destination: Previous Interview Report OR Start New Interview

---

## 6. AUTHENTICATION FLOW

### Signup
User provides details → System creates user record → User logs in.

### Login
User provides credentials → System verifies → Issues session token.

### Logout
User clicks logout → System destroys session token → Redirects to Landing.

### Forgot Password
User requests reset → System sends link (conceptual) → User accesses reset page.

### Reset Password
User enters new password → System updates record → Redirects to Login.

### Protected Route & Role-based Access

```text
User
 ↓
Login
 ↓
Authentication
 ↓
Role Detection
 ↓
Candidate/Admin Area
```

**Invalid authentication flow:**
```text
Authentication Failure
 ↓
Error State
 ↓
Remain on / Return to Authentication
```

---

## 7. CANDIDATE DASHBOARD FLOW

The Dashboard acts as a central hub:

- Dashboard → Start Interview → Interview Setup
- Dashboard → Recent Interview → Performance Report
- Dashboard → History → Interview History
- Dashboard → Progress → Progress Analytics
- Dashboard → Profile/Settings → User Profile

---

## 8. INTERVIEW SETUP FLOW

```text
Dashboard
 ↓
Interview Setup
```

Candidate selects:
- Domain
- Difficulty
- Duration
- Uploads/selects resume

```text
Validation
 ↓
Valid
 ↓
Start Interview
```

OR:

```text
Validation
 ↓
Invalid
 ↓
Show validation state
 ↓
User corrects input
```

---

## 9. RESUME FLOW

```text
Resume Upload
 ↓
File Validation
 ↓
Valid
 ↓
Storage
 ↓
Resume Processing
 ↓
Extracted Context
 ↓
Question Generation
```

**Failure cases:**
- **Invalid file type:** Reject upload, ask for supported format.
- **Invalid file size:** Reject upload, specify maximum allowed size.
- **Upload failure:** Network error, ask user to retry.
- **Processing failure:** Backend cannot parse text, fallback to generic domain questions or ask for manual input (conceptual).

---

## 10. QUESTION GENERATION FLOW

```text
Interview Configuration
+
Resume Context
+
Candidate Information
        ↓
Prompt Preparation
        ↓
LLM Request
        ↓
Generated Questions
        ↓
Validation
        ↓
Valid Questions
        ↓
Interview Session
```

**Failure cases:**
- **LLM unavailable:** Show a loading state error, handle the error, allow retry. Do not start an incomplete interview.
- **LLM response invalid:** Show error, allow retry.
- **Question generation failure:** Notify user, cancel interview initialization.

---

## 11. INTERVIEW SESSION FLOW

```text
Interview Start
 ↓
Question 1
 ↓
Candidate Answers
 ↓
Submit Answer
 ↓
Response Captured
 ↓
Next Question
 ↓
Question 2
 ↓
...
 ↓
Final Question
 ↓
Submit
 ↓
Interview Completion
```

**During the session, the UI provides:**
- Question number
- Timer
- Answer area (text/audio)
- Next action button
- Interview completion trigger
- Exit confirmation button

---

## 12. TEXT RESPONSE FLOW

```text
Question
 ↓
Candidate types answer
 ↓
Answer validation (check if empty conceptually)
 ↓
Submit
 ↓
Store/send response
 ↓
Continue
```

---

## 13. AUDIO RESPONSE FLOW

```text
Question
 ↓
Microphone permission
 ↓
Start Recording
 ↓
Recording
 ↓
Stop
 ↓
Speech-to-Text (Web Speech API / Whisper)
 ↓
Transcript
 ↓
Submit
 ↓
Evaluation
```

**Failure cases:**
- **Microphone denied:** Show instruction to enable mic, fallback to text answer.
- **Recording failure:** Notify user, fallback to text.
- **Transcription failure:** Notify user, fallback to text.

---

## 14. INTERVIEW EXIT FLOW

```text
Exit
 ↓
Confirmation
 ↓
Cancel
OR
Confirm Exit
```

After confirming exit, the user is conceptually returned to the Dashboard. 
*(PENDING TECHNICAL / PRODUCT DECISION: whether an incomplete interview is permanently saved or discarded).*

---

## 15. AI EVALUATION FLOW

```text
Question
+
Candidate Answer
        ↓
Evaluation Input
        ↓
LLM
        ↓
Evaluation
        ↓
Relevance, Depth, Clarity, Technical Accuracy
        ↓
Score + Feedback
        ↓
Save Evaluation
```

**Failure cases:**
- **AI unavailable:** Notify user evaluation is delayed/failed.
- **Malformed response:** Retry or gracefully fail without fabricating data.
- **Evaluation failure:** Do not show fabricated evaluation data.

---

## 16. PERFORMANCE REPORT FLOW

```text
All Question Evaluations
        ↓
Aggregate Results
        ↓
Overall Score
        ↓
Strengths
        ↓
Weaknesses
        ↓
Improvement Suggestions
        ↓
Final Report
```

Candidate views: overall score, question-wise evaluation, strengths, weaknesses, improvement suggestions.

---

## 17. HISTORY FLOW

```text
Candidate Dashboard
 ↓
Interview History
 ↓
Past Interviews
 ↓
Select Interview
 ↓
View Report
```

**Empty state behavior:**
```text
History
 ↓
No Interview History
 ↓
Start Interview
```

---

## 18. PROGRESS FLOW

```text
Historical Interview Data
 ↓
Score Aggregation
 ↓
Progress Metrics
 ↓
Charts / Trends
 ↓
Candidate Views Progress
```

Includes score progression, domain performance, and useful trend information.

---

## 19. ADMIN FLOW

```text
Admin Login
 ↓
Role Verification
 ↓
Admin Dashboard
 ├── User Management
 ├── Question Bank
 └── Platform Analytics
```

---

## 20. ADMIN USER MANAGEMENT FLOW

```text
Admin
 ↓
User Management
 ↓
Search / Filter
 ↓
Select User
 ↓
View / Manage User (PENDING actions like deletion/ban)
```

---

## 21. ADMIN QUESTION BANK FLOW

```text
Admin
 ↓
Question Bank
 ↓
View Questions
 ↓
Filter by Domain / Difficulty
 ↓
Manage Questions
```

*(PENDING TECHNICAL DECISION: whether all AI-generated questions automatically enter the bank).*

---

## 22. ADMIN ANALYTICS FLOW

```text
Admin
 ↓
Platform Analytics
 ↓
Usage Data
 ↓
Aggregated Metrics
 ↓
Charts / Tables
```

*(Limited to basic platform analytics in scope).*

---

## 23. LOADING STATES

- **Login:** Authenticating... → Success / Error
- **Signup:** Creating account... → Success / Error
- **Dashboard data:** Fetching statistics... → Success / Error
- **Resume upload:** Uploading... → Success / Error
- **Resume processing:** Parsing document... → Success / Error
- **Question generation:** Generating custom questions... → Success / Error
- **Answer submission:** Saving response... → Success / Error
- **AI evaluation:** Evaluating... → Success / Error
- **Report generation:** Compiling report... → Success / Error
- **History:** Loading history... → Success / Error
- **Analytics:** Fetching metrics... → Success / Error

---

## 24. ERROR & FAILURE FLOWS

### Authentication errors
1. What failed: Incorrect email/password.
2. User sees: "Invalid credentials" message.
3. Retry: Yes.
4. Next: Remain on login page.

### Invalid form data
1. What failed: Required field missing in setup.
2. User sees: Field highlighted red.
3. Retry: Yes.
4. Next: User corrects input.

### Resume upload failure
1. What failed: File too large or network error.
2. User sees: Upload failed alert.
3. Retry: Yes.
4. Next: Try again or select different file.

### Resume processing failure
1. What failed: Server could not read text from PDF.
2. User sees: Parsing failed alert.
3. Retry: Yes/No depending on file.
4. Next: Fallback to manual setup or generic questions.

### AI question generation failure
1. What failed: LLM timeout or error.
2. User sees: Generation failed message.
3. Retry: Yes.
4. Next: Dashboard or retry setup.

### Answer submission failure
1. What failed: Network disconnected while submitting.
2. User sees: Save failed alert.
3. Retry: Yes.
4. Next: Retry submission.

### Speech-to-text failure
1. What failed: Microphone issue or transcription error.
2. User sees: Audio failed alert.
3. Retry: Yes.
4. Next: Fallback to text area.

### AI evaluation failure
1. What failed: LLM failed to score answer.
2. User sees: Evaluation pending/failed state.
3. Retry: Yes.
4. Next: PENDING TECHNICAL DECISION (Depends on whether evaluation is synchronous or asynchronous).

### Database/API failure
1. What failed: System outage.
2. User sees: Generic error page/toast.
3. Retry: Later.
4. Next: Refresh page.

### Unauthorized access
1. What failed: Candidate tries to access admin routes.
2. User sees: 403 Forbidden or redirect.
3. Retry: No.
4. Next: Redirect to Candidate Dashboard.

### Network failure
1. What failed: User loses internet.
2. User sees: Offline indicator.
3. Retry: Yes (auto when back online).
4. Next: Wait for connection.

---

## 25. AUTHORIZATION / SECURITY FLOW

```text
Request
 ↓
Authentication Check
 ↓
Authenticated?
 ├── No → Reject / Redirect
 └── Yes
       ↓
Role Check
       ↓
Authorized?
 ├── No → Access Denied
 └── Yes → Continue
```

---

## 26. COMPLETE CANDIDATE JOURNEY

```text
New User
 ↓
Signup
 ↓
Login
 ↓
Dashboard
 ↓
Interview Setup
 ↓
Resume
 ↓
Question Generation
 ↓
Interview
 ↓
Answer
 ↓
Evaluation
 ↓
Next Question
 ↓
Final Question
 ↓
Report
 ↓
History
 ↓
Progress
```

---

## 27. COMPLETE ADMIN JOURNEY

```text
Admin Login
 ↓
Role Verification
 ↓
Admin Dashboard
 ↓
User Management
 ↓
Question Bank
 ↓
Analytics
```

---

## 28. PAGE NAVIGATION MAP

| Current Page | User Action | Destination | Condition |
|---|---|---|---|
| Landing Page | Click Login | Login Page | N/A |
| Landing Page | Click Signup | Signup Page | N/A |
| Login Page | Submit Form | Candidate Dashboard | If Candidate |
| Login Page | Submit Form | Admin Dashboard | If Admin |
| Signup Page | Submit Form | Login Page (or Dashboard) | Success |
| Candidate Dashboard | Click Start | Interview Setup | N/A |
| Candidate Dashboard | Click History | Interview History | N/A |
| Candidate Dashboard | Click Progress | Progress Analytics | N/A |
| Candidate Dashboard | Click Profile | Profile/Settings | N/A |
| Interview Setup | Submit Configuration | Interview Room | Valid input & generated |
| Interview Room | Complete Last Question | Performance Report | Session finished |
| Performance Report | Click History | Interview History | N/A |
| Interview History | Select Interview | Performance Report | N/A |
| Admin Dashboard | Click Users | User Management | Admin role |
| Admin Dashboard | Click Questions | Question Bank Management | Admin role |
| Admin Dashboard | Click Analytics | Platform Analytics | Admin role |

---

## 29. EDGE CASES

| Flow | Edge Case | Expected Behaviour | Status |
|---|---|---|---|
| Signup | Duplicate email | Show "Email in use" | Confirmed |
| Login | Wrong credentials | Show "Invalid credentials" | Confirmed |
| Auth | Expired authentication | Redirect to Login | Confirmed |
| Setup | Empty interview setup | Block progression | Confirmed |
| Resume | Unsupported file format | Show "Invalid format" | Confirmed |
| Resume | Oversized resume | Show "File too large" | Confirmed |
| Resume | Processing failure | Fallback/Alert | PENDING |
| AI | Question generation failure | Cancel interview & Alert | Confirmed |
| Interview | Empty answer submitted | Block or Warn | PENDING |
| Audio | Microphone denied | Fallback to Text | Confirmed |
| Audio | Transcription failure | Fallback to Text | Confirmed |
| Evaluation| AI evaluation failure | Retry or mark Pending | PENDING |
| Interview | User exits incomplete interview | Save or Discard | PENDING |
| History | No interview history | Show Empty State | Confirmed |
| Admin | Unauthorized page access | Redirect to Dashboard | Confirmed |
| System | Network interruption | Show offline alert | Confirmed |

---

## 30. FLOW-TO-MODULE MAPPING

| Flow | Related Modules |
|---|---|
| Authentication | M01, M18, M19 |
| Interview Setup | M03, M04, M20 |
| Question Generation | M05, M17 |
| Interview Session | M06, M07 |
| AI Evaluation | M08, M17 |
| Performance Report | M09 |
| Interview History | M10, M19 |
| Progress Tracking | M11, M19 |
| Admin Flows | M12, M13, M14, M15 |

---

## 31. FLOW-TO-REQUIREMENT MAPPING

| Flow | Requirement |
|---|---|
| Authentication Flow | FR-01 |
| Interview Setup Flow | FR-02 |
| Resume Processing Flow | FR-02, FR-03 |
| Question Generation Flow | FR-03 |
| Interview Session Flow | FR-04 |
| Audio/Text Response Flow | FR-04, FR-05 |
| AI Evaluation Flow | FR-06 |
| Performance Report Flow | FR-07 |
| History & Progress Flows | FR-08 |
| Admin Flows | FR-09 |

---

## 32. OPEN PRODUCT DECISIONS

The following product and technical decisions remain pending and should not be finalized yet:

- Exact behaviour when candidate exits an incomplete interview
- Whether incomplete interviews are saved in history
- Whether empty answers are allowed to be submitted
- Exact number of interview questions per session
- Exact duration options (e.g., 10 mins, 30 mins)
- Exact resume formats supported beyond PDF
- Exact retry limits for AI LLM failures
- Exact report-generation timing (synchronous vs asynchronous)
- Whether AI evaluation per question is synchronous or asynchronous
- Exact speech-to-text fallback behaviour details

---

## 33. PHASE 03 COMPLETION CHECKLIST

- [ ] Candidate first-time flow documented
- [ ] Returning candidate flow documented
- [ ] Authentication flow documented
- [ ] Dashboard flow documented
- [ ] Interview setup flow documented
- [ ] Resume flow documented
- [ ] Question generation flow documented
- [ ] Interview session flow documented
- [ ] Text response flow documented
- [ ] Audio response flow documented
- [ ] AI evaluation flow documented
- [ ] Report flow documented
- [ ] History flow documented
- [ ] Progress flow documented
- [ ] Admin flow documented
- [ ] Loading states documented
- [ ] Error flows documented
- [ ] Authorization flow documented
- [ ] Page navigation mapping completed
- [ ] Edge cases documented
- [ ] Module mapping completed
- [ ] Requirement mapping completed
- [ ] Open decisions documented
