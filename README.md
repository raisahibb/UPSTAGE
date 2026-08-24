# UPSTAGE — AI-Powered Mock Interview Platform

Welcome to the **UPSTAGE** repository! UPSTAGE is a comprehensive full-stack web application designed to help students and job-seekers practice mock interviews in a realistic, personalized, and AI-driven environment.

## 🚀 Current Progress

So far, we have successfully initialized and built the **Frontend** foundation of the platform:

- **Project Initialization**: Scaffolding with React, Vite, and Tailwind CSS.
- **Routing System**: Complete routing implemented using `react-router-dom` with Public, Auth, and Protected routes.
- **Authentication (Mock)**: Implemented `AuthContext` utilizing localStorage for prototyping frontend flows.
  - Role-based access control implemented for `candidate` and `admin`.
  - Configured specific admin bypass for testing (e.g., `sidhuc888@gmail.com`).
- **Core UI Pages Built**:
  - Landing Page
  - Authentication Pages (Login, Signup)
  - Candidate Dashboard
  - Interview Setup & Interview Room
  - Admin Dashboard

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend (Upcoming)**: Node.js, Express.js
- **Database (Upcoming)**: MongoDB Atlas, Mongoose
- **AI & Services (Upcoming)**: Google Gemini API, OpenAI API, Web Speech API

## 💻 Getting Started

To run the frontend application locally:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

For more details on the project's architecture, scope, and technical documentation, please refer to the `UPSTAGE_PROJECT_HANDBOOK.md` located in this root directory.
