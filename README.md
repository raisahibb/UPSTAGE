# UPSTAGE — AI-Powered Mock Interview Platform

> **Practice smarter. Interview better.**

UPSTAGE is a full-stack, AI-driven mock interview platform built for students and job-seekers who want to practice interviews in a realistic, personalized, and intelligent environment. Powered by **Google Gemini** and **Groq**, UPSTAGE generates dynamic questions, evaluates your answers, and provides detailed feedback — all in real time.

---

## ✨ Features

- 🎯 **AI-Generated Interview Questions** — Role and resume-aware questions generated via Gemini & Groq APIs
- 📄 **Resume Parsing** — Upload PDF/DOCX resumes; backend extracts context to personalize your interview
- 🤖 **Real-Time AI Evaluation** — Each answer is scored and evaluated by AI with detailed feedback
- 🔐 **JWT Authentication** — Secure signup/login with bcrypt-hashed passwords and JWT tokens
- 👤 **Role-Based Access** — Separate flows for `candidate` and `admin` roles
- 📊 **Interview History & Progress** — Track all past interviews, scores, and improvement over time
- 🛡️ **Rate Limiting** — API rate limiting to prevent abuse
- ☁️ **Firebase Hosting** — Frontend deployed on Firebase

---

## 🏗️ Project Architecture

```
UPSTAGE/
├── frontend/          # React 19 + Vite + Tailwind CSS 4
│   └── src/
│       ├── pages/     # Auth, Candidate (Dashboard, Interview, History, Progress), Admin
│       ├── components/
│       ├── context/   # AuthContext (JWT-based)
│       ├── routes/    # Public, Protected, Auth route guards
│       └── services/  # API service layer
│
└── backend/           # Node.js + Express REST API
    └── src/
        ├── controllers/   # auth, interview, ai, question, response, admin
        ├── models/        # User, Interview, InterviewQuestion, InterviewResponse, QuestionBank
        ├── routes/        # Modular route files
        ├── middleware/     # Auth middleware, error handling
        └── services/      # AI provider, resume parsing, fallback questions
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, React Router v7 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas + Mongoose |
| **Authentication** | JWT + bcryptjs |
| **AI (Primary)** | Google Gemini API (`@google/generative-ai`) |
| **AI (Secondary)** | Groq SDK |
| **File Parsing** | Multer, pdf-parse, Mammoth (DOCX) |
| **Deployment** | Firebase Hosting (Frontend) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm `v9+`
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key
- Groq API key (optional, used as fallback)

---

### 1. Clone the Repository

```bash
git clone https://github.com/raisahibb/UPSTAGE.git
cd UPSTAGE
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

GEMINI_API_KEY=your_gemini_api_key

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

Start the dev server:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 📡 API Overview

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and get JWT token | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |
| `POST` | `/api/interviews` | Create a new interview session | ✅ |
| `GET` | `/api/interviews` | Get all interviews for user | ✅ |
| `GET` | `/api/interviews/:id` | Get interview details | ✅ |
| `POST` | `/api/ai/generate-questions` | Generate AI questions | ✅ |
| `POST` | `/api/ai/evaluate-response` | Evaluate a candidate answer | ✅ |
| `POST` | `/api/ai/upload-resume` | Upload and parse resume | ✅ |
| `GET` | `/api/admin/users` | Get all users (admin only) | ✅ Admin |

---

## 📂 Current Progress

### ✅ Completed
- [x] Full project scaffolding (monorepo structure)
- [x] Backend REST API with Express + MongoDB
- [x] JWT-based authentication (register, login, protected routes)
- [x] User model with role-based access (`candidate`, `admin`)
- [x] AI question generation via Gemini & Groq
- [x] Resume upload and parsing (PDF + DOCX)
- [x] Interview session management (create, fetch, store responses)
- [x] AI response evaluation with scoring and feedback
- [x] Frontend pages: Landing, Auth, Candidate Dashboard, Interview Setup, Interview Room, History, Progress, Admin Dashboard
- [x] Protected routing with role-based guards
- [x] Firebase deployment setup

### 🔄 In Progress / Upcoming
- [ ] Detailed performance analytics & charts
- [ ] Interview report PDF export
- [ ] Real-time speech-to-text (Web Speech API)
- [ ] Email notifications
- [ ] Admin analytics dashboard

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  <sub>Built with ❤️ by the UPSTAGE team</sub>
</div>
