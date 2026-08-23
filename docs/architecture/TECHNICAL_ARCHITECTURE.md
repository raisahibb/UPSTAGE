# UPSTAGE — Technical Architecture & Folder Structure

## 1. ARCHITECTURE OVERVIEW

The UPSTAGE platform follows a standard layered architecture:

```text
Frontend (React + Tailwind)
    ↓
Backend API (Node + Express)
    ↓
Business Services (AI / Interivew / Reports)
    ↓
Database / AI / Storage (MongoDB / LLM / Cloudinary)
```

- **Frontend:** The client-side application built with React, responsible for UI, routing, and user interaction.
- **Backend API:** The server-side application that handles authentication, business logic, and API endpoints.
- **Business Services:** Specific modules within the backend that handle core tasks like AI prompt generation and resume parsing.
- **Database / AI / Storage:** External services where data, AI processing, and files reside.

This architecture avoids unnecessary microservices, keeping the codebase beginner-friendly and cohesive.

---

## 2. STITCH DESIGN SYSTEM EXTRACTION

**Brand:** UPSTAGE  
**Design philosophy:** Calm Productivity, Academic Rigor, Modern Minimalism

The UI will use the exact design tokens extracted from the Stitch prototype:

**Colors:**
- Primary: `#312e81` (Indigo)
- Background: `#f7f9fb` (Soft off-white)
- Surface: `#ffffff` (White)
- Primary text: `#1e293b` (Charcoal)
- Secondary text: `#64748b` (Slate)
- Borders: `#e2e8f0` (Low-contrast)

**Typography:**
- Font: Hanken Grotesk
- Body Text: 16px
- Line Height: 1.5 - 1.6
- Weight: Regular (400), Semibold (600), Bold (700)

**Spacing & Layout:**
- 4px baseline grid
- Margins: 24px (desktop), 16px (mobile)
- Gutters: 24px
- Container: 1280px maximum width

**Shapes & Borders:**
- Buttons & Inputs: 4px radius (`rounded`)
- Cards & Modals: 8px radius (`rounded-lg`)
- Badges: Fully rounded (`rounded-full`)
- Borders: 1px solid `#e2e8f0`
- Shadow: Level 2 Interaction only `0px 4px 12px rgba(0, 0, 0, 0.05)`

---

## 3. FRONTEND ARCHITECTURE

```text
frontend/
└── src/
    ├── assets/       # Static files (images, icons, global styles)
    ├── components/   # Reusable UI elements
    │   ├── common/   # Buttons, inputs, modals, cards
    │   ├── auth/     # Login forms, signup forms
    │   ├── dashboard/# Stat cards, recent interviews list
    │   ├── interview/# Question display, timer, recorder
    │   ├── report/   # Score breakdowns, feedback blocks
    │   └── admin/    # Data tables, filter bars
    │
    ├── layouts/      # Structural wrappers (PublicLayout, AuthLayout, CandidateLayout, AdminLayout)
    ├── pages/        # Route-level components mapping to actual screens
    │   ├── public/   # Landing page
    │   ├── auth/     # Login, Signup
    │   ├── candidate/# Dashboard, Setup, Room, Report, History
    │   └── admin/    # Admin Console
    │
    ├── routes/       # React Router configuration
    ├── services/     # API client functions (axios/fetch wrappers)
    ├── hooks/        # Custom React hooks (e.g., useAudioRecorder, useAuth)
    ├── store/        # Zustand global state stores
    ├── utils/        # Helper functions (date formatting, validators)
    ├── constants/    # Fixed values (endpoints, limits)
    ├── App.jsx       # Root component
    └── main.jsx      # React entry point
```

**Responsibilities:**
- `components/`: Pure, presentational pieces. Does NOT fetch data directly (unless specifically a smart component).
- `pages/`: Matches a route. Fetches data, holds page-level state, passes props to components.
- `layouts/`: Defines standard headers, sidebars, and footers.
- `services/`: The ONLY place where `fetch` or `axios` is called.

---

## 4. STITCH SCREEN → REACT PAGE MAPPING

| Stitch Screen | React Page | Module | Owner | Phase |
|---|---|---|---|---|
| upstage_landing_page | `public/LandingPage.jsx` | Public / Shared Application UI | Rakshit | Phase 08 |
| upstage_signup | `auth/SignupPage.jsx` | M01 | Radhika | Phase 08 |
| upstage_login | `auth/LoginPage.jsx` | M01 | Radhika | Phase 08 |
| upstage_dashboard | `candidate/DashboardPage.jsx` | M02 | Muskaan | Phase 12 |
| upstage_setup_interview | `candidate/InterviewSetupPage.jsx` | M03, M04 | Radhika | Phase 12 |
| upstage_interview_room | `candidate/InterviewRoomPage.jsx` | M06, M07 | Muskaan | Phase 12 |
| upstage_history | `candidate/HistoryPage.jsx` | M10 | Muskaan | Phase 14 |
| upstage_performance_report | `candidate/PerformanceReportPage.jsx` | M09 | Muskaan | Phase 14 |
| upstage_admin_console | `admin/AdminDashboardPage.jsx` | M12, M13 | Rakshit | Phase 15 |

---

## 5. MISSING REQUIRED PAGES

The following pages are REQUIRED BY PROJECT but MISSING FROM STITCH. They will be designed consistently with the existing Stitch design system:

- **Forgot Password** (MISSING FROM STITCH — REQUIRED BY PROJECT)
- **Reset Password** (MISSING FROM STITCH — REQUIRED BY PROJECT)
- **Resume Preview** (MISSING FROM STITCH — REQUIRED BY PROJECT)
- **Interview Completion / Loading state** (MISSING FROM STITCH — REQUIRED BY PROJECT)
- **Progress Analytics** (MISSING FROM STITCH — REQUIRED BY PROJECT)
- **Profile / Settings** (MISSING FROM STITCH — REQUIRED BY PROJECT)
- **Admin User Management** (Detailed view) (MISSING FROM STITCH — REQUIRED BY PROJECT)
- **Admin Question Bank** (Detailed view) (MISSING FROM STITCH — REQUIRED BY PROJECT)
- **Admin Analytics** (Detailed view) (MISSING FROM STITCH — REQUIRED BY PROJECT)

---

## 6. REUSABLE COMPONENTS

**Common:**
- `Button`: Primary, secondary, and disabled states.
- `Input`: Text input with error styling and validation.
- `Select`: Dropdown selection.
- `Card`: White background, 1px border container.
- `Badge`: Pill-shaped status indicator.
- `Modal`: Overlay container for confirmations.
- `Toast`: Transient success/error notification.
- `Loader`: Visual indicator for async operations.
- `EmptyState`: Placeholder for missing data.
- `ErrorState`: Friendly error display.

**Navigation:**
- `Navbar`: Top navigation bar.
- `Sidebar`: Candidate/Admin side menu.
- `UserMenu`: Dropdown for profile/logout.

**Dashboard:**
- `StatCard`: Quick numerical overview.
- `InterviewCard`: Summary of a past interview.
- `ProgressCard`: Basic chart or trend indicator.

**Interview:**
- `QuestionCard`: Displays current question.
- `InterviewProgress`: Minimalist top progress bar.
- `Timer`: Countdown/count-up display.
- `AnswerInput`: Textarea for written responses.
- `AudioRecorder`: Mic controls.
- `ResumeUploader`: Drag-and-drop file input.

**Report:**
- `ScoreCard`: Overall score display.
- `ScoreBreakdown`: Per-question score list.
- `FeedbackBlock`: Indigo-tinted AI feedback area.
- `StrengthSection`: List of positive feedback.
- `WeaknessSection`: List of constructive feedback.

**Admin:**
- `DataTable`: Generic table for users/questions.
- `FilterBar`: Search and filter controls.
- `UserRow`: Single user entry.
- `QuestionRow`: Single question entry.

---

## 7. COMPONENT → STITCH SCREEN MAPPING

| Component | Screens Using It | Reusable? | Owner |
|---|---|---|---|
| `Button` | All screens | Yes | Rakshit |
| `Input` | Login, Signup, Setup | Yes | Rakshit |
| `Card` | Dashboard, Report, Admin | Yes | Rakshit |
| `Navbar` | Landing, Auth | Yes | Rakshit |
| `Sidebar` | Dashboard, History, Admin | Yes | Rakshit |
| `StatCard` | Dashboard, Admin | Yes | Muskaan / Rakshit |
| `InterviewCard` | Dashboard, History | Yes | Muskaan |
| `AudioRecorder` | Interview Room | No (Specific) | Muskaan |
| `FeedbackBlock` | Performance Report | No (Specific) | Muskaan |
| `DataTable` | Admin Console | Yes | Rakshit |

---

## 8. LAYOUT ARCHITECTURE

**PublicLayout:**
- Contains generic header and footer.
- Used by: Landing Page.

**AuthLayout:**
- Contains split screen or centered card layout.
- Used by: Login, Signup, Forgot Password, Reset Password.

**CandidateLayout:**
- Contains authenticated sidebar and top user bar.
- Used by: Dashboard, Interview Setup, Interview Room, History, Report, Progress, Profile.

**AdminLayout:**
- Contains admin-specific sidebar and top menu.
- Used by: Admin Dashboard, User Management, Question Bank, Analytics.

---

## 9. NAVIGATION ARCHITECTURE

**Candidate Navigation:**
- Dashboard
- Interviews (Setup/Room)
- History
- Progress
- Profile

**Admin Navigation:**
- Dashboard
- Users
- Questions
- Analytics

*(Matches the standard established in the requirements; Stitch prototype sidebars will be adapted to fit this exactly).*

---

## 10. RESPONSIVE ARCHITECTURE

- **Desktop (1024px+):** Full sidebar, maximum container width 1280px.
- **Tablet (768px - 1023px):** Collapsed sidebar or bottom navigation. Grids collapse to fewer columns.
- **Mobile (< 768px):** Hamburger menu, stacked layouts, full-width cards.

*(Will use Tailwind's default breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px).*

---

## 11. STATE MANAGEMENT ARCHITECTURE

- **Zustand:**
  - Authentication state (token, user role).
  - Interview session state (current question index, answers).
  - User preferences (theme, sidebar toggle).

- **TanStack Query (React Query):**
  - Dashboard data fetching.
  - Interview history lists.
  - Performance reports.
  - Admin data fetching.
  - Caching and re-fetching logic.

- **React Local State (`useState`):**
  - Form fields (controlled inputs).
  - Modal open/close state.
  - Audio recording state (isRecording).

---

## 12. ROUTING ARCHITECTURE

**Public:**
- `/` (Landing)

**Auth:**
- `/login`
- `/signup`

**Candidate (Protected):**
- `/dashboard`
- `/interview/setup`
- `/interview/room`
- `/interview/report/:id`
- `/history`
- `/progress`
- `/profile`

**Admin (Protected, Role-checked):**
- `/admin`
- `/admin/users`
- `/admin/questions`
- `/admin/analytics`

---

## 13. BACKEND ARCHITECTURE

```text
backend/
├── config/       # Environment variables, DB connection
├── controllers/  # Request handlers (req, res)
├── middleware/   # Auth verification, error handling
├── models/       # Mongoose schemas
├── routes/       # Express route definitions
├── services/     # Core business logic
│   ├── ai/       # LLM integration
│   ├── interview/# Setup and session logic
│   └── storage/  # Cloudinary uploads
├── validators/   # Joi/Zod input validation
├── utils/        # Helper functions
└── server.js     # Express entry point
```

**Responsibilities:**
- Routes define endpoints and map to Controllers.
- Controllers handle HTTP req/res and call Services.
- Services contain the actual logic and call Models or external APIs.
- Middleware intercepts requests for auth and logging.

---

## 14. API BOUNDARY

- **Auth:** `POST /api/auth/login`, `POST /api/auth/signup`
- **Users:** `GET /api/users/me`, `PUT /api/users/profile`
- **Interviews:** `POST /api/interviews/setup`, `GET /api/interviews/:id`
- **Questions:** `POST /api/questions/generate`
- **Responses:** `POST /api/responses/submit`
- **Reports:** `GET /api/reports/:interviewId`
- **Admin:** `GET /api/admin/users`, `GET /api/admin/stats`
- **Upload:** `POST /api/upload/resume`

---

## 15. AI BOUNDARY

Frontend **MUST NOT** directly expose AI API keys.

```text
Frontend
 ↓ (API Call)
Backend
 ↓ (Service Layer)
AI Service
 ↓ (Secure API Request)
Gemini/OpenAI
```

**AI Service responsibilities:**
- Prompt preparation and sanitization.
- Question generation based on resume.
- Output validation (JSON parsing).
- Response evaluation (Scoring).
- Error handling and retry logic.

---

## 16. DATABASE BOUNDARY

**Core Entities (MongoDB):**
- **User:** Credentials, role, profile details.
- **Interview:** Configuration (domain, difficulty), status, candidate ref.
- **Question:** Question text, expected answer, interview ref.
- **Response:** Candidate answer (text/audio ref), question ref.
- **Report:** Aggregate scores, feedback, interview ref.

---

## 17. STORAGE BOUNDARY

```text
Frontend
 ↓ (Upload Request)
Backend
 ↓ (Upload API)
Cloudinary (Storage)
 ↓ (Returns URL)
Backend (Stores URL in DB)
 ↓
Resume Processing (Uses URL)
```

---

## 18. STITCH DESIGN → REQUIREMENT COVERAGE

| Requirement | Stitch Coverage | Screen | Status |
|---|---|---|---|
| FR-01 Authentication | COVERED | Login, Signup | UI EXISTS |
| FR-02 Interview Setup | COVERED | Interview Setup | UI EXISTS |
| FR-03 Question Generation | BACKEND-ONLY | N/A | BACKEND |
| FR-04 Response Capture | COVERED | Interview Room | UI EXISTS |
| FR-05 Speech-to-Text | PARTIALLY COVERED | Interview Room (UI) | PENDING LOGIC |
| FR-06 AI Evaluation | BACKEND-ONLY | N/A | BACKEND |
| FR-07 Report | COVERED | Performance Report | UI EXISTS |
| FR-08 History & Progress | PARTIALLY COVERED | History (Missing Progress) | PARTIAL UI |
| FR-09 Admin | PARTIALLY COVERED | Admin Console (Dashboard only) | PARTIAL UI |

---

## 19. STITCH DESIGN → USER FLOW COVERAGE

- **Covered Flows:** Signup, Login, Setup, Interview Session, Report view, History list view.
- **Missing Screens:** Progress Analytics, specific Admin detail pages, Profile.
- **Missing Loading States:** Skeletons, spinners not explicitly in static Stitch screens.
- **Missing Empty States:** No "Zero history" screen in prototype.
- **Missing Error States:** Toast notifications or error banners not in prototype.
- **Missing Transitions:** Navigation states between pages.

---

## 20. TEAM OWNERSHIP

- **Raisahib:** Architecture, Backend, AI Services, Database, Cloudinary Integration.
- **Radhika:** Requirement Analysis, UI Design System, Auth UI, Interview Setup UI.
- **Muskaan:** Candidate Dashboard, Interview Room UI, Performance Report UI, History UI.
- **Rakshit:** Common Components, Layouts, Admin UI, QA.

---

## 21. PROPOSED COMPLETE PROJECT TREE

```text
UPSTAGE/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── docs/
│   ├── requirements/
│   ├── architecture/
│   └── ...
│
├── .gitignore
├── README.md
└── UPSTAGE_PROJECT_HANDBOOK.md
```

*(DO NOT create all application files yet).*

---

## 22. DECIDED VS PENDING

### DECIDED:
- React
- Vite
- Tailwind CSS
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zustand
- TanStack Query
- Gemini/OpenAI integration boundary
- Cloudinary
- Stitch design system (Hanken Grotesk, Indigo `#312e81`)
- Visual design tokens

### PENDING:
- Exact API endpoint names
- Exact MongoDB fields
- Exact AI provider priority (Gemini vs OpenAI)
- Exact speech-to-text implementation (Web Speech vs Whisper)
- Exact resume parsing library
- Exact caching strategy
- Exact Socket.io usage (if any)
- Deployment architecture

---

## 23. ARCHITECTURE PRINCIPLES

1. Keep code beginner-friendly.
2. Keep modules independent.
3. Reuse components.
4. Avoid unnecessary abstraction.
5. Do not expose secrets.
6. Keep AI behind the backend.
7. Keep UI separate from business logic.
8. Keep server state separate from UI state.
9. Preserve Stitch visual consistency.
10. Do not blindly copy generated Stitch code.
11. Do not rewrite working modules without reason.
12. Every major module must be explainable by its owner.

---

## 24. PHASE 04 COMPLETION CHECKLIST

- [ ] Stitch prototype inspected
- [ ] Stitch design system documented
- [ ] Stitch screens mapped
- [ ] Missing required pages identified
- [ ] Reusable components identified
- [ ] Layout architecture defined
- [ ] Frontend architecture defined
- [ ] Backend architecture defined
- [ ] Routing architecture defined
- [ ] State management defined
- [ ] API boundary defined
- [ ] AI boundary defined
- [ ] Database boundary defined
- [ ] Storage boundary defined
- [ ] Requirement coverage checked
- [ ] User-flow coverage checked
- [ ] Team ownership mapped
- [ ] Project tree documented
- [ ] Decided/pending decisions separated
