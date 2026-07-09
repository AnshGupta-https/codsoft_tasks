# 🎯 Online Quiz Maker
## Overview

Admins create multiple-choice quizzes through a dynamic question builder; any registered user can browse by category, take a quiz against a countdown timer, and get an instant score with a full answer breakdown. Built end-to-end as part of a full-stack development internship (CodSoft, Level 2 – Task 2).

## Features

- JWT authentication with bcrypt password hashing
- Role-based access control - quiz creation restricted to admins (enforced server-side)
- Dynamic quiz builder - add/remove questions, 4 options each, mark the correct answer
- Quiz listing with category filtering
- One-question-at-a-time quiz flow with a 60s countdown timer and auto-submit
- Automatic score calculation
- Result page with full correct/incorrect answer breakdown
- Quiz history for logged-in users
- Fully responsive UI (Tailwind CSS)
- Error handling and loading states on every data-fetching page

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcrypt |

## Project Structure

```
quiz-maker/                # Frontend (React + Vite)
├── src/components/        # Reusable UI components
├── src/pages/              # Route-level pages
├── src/context/             # AuthContext (global auth state)
└── src/App.jsx               # Route definitions

quiz-maker-backend/        # Backend (Express + MongoDB)
├── models/                # Mongoose schemas (User, Quiz, Result)
├── routes/                 # API route handlers
├── middleware/               # JWT auth & role-based guards
└── server.js                   # App entry point
```

## Installation & Setup

```bash
# Backend
cd quiz-maker-backend
npm install
npm run dev              # http://localhost:5000

# Frontend (new terminal)
cd quiz-maker
npm install
npm run dev              # http://localhost:5173
```

Optional backend scripts:
- `node seed.js` — seeds 3 sample quizzes
- `node promoteAdmin.js <email>` — promotes a registered user to admin

## Environment Variables

Create a `.env` file in `quiz-maker-backend/`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/quizzes` | Public |
| GET | `/api/quizzes/:id` | Public |
| POST | `/api/quizzes` | Admin |
| GET | `/api/results` | Protected |
| POST | `/api/results` | Protected |

## Usage

- Register or log in to unlock quiz creation and history
- Browse quizzes and filter by category
- Admins build new quizzes via the dynamic question form
- Take a quiz against the timer - score and breakdown shown instantly
- Review past attempts anytime from the History page

