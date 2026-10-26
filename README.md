# ⚡ TaskFlow — Modern Gen Z Creative Task Manager

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)
![CI/CD](https://img.shields.io/badge/GitHub_Actions-Automated_Deploy-2088FF?logo=github-actions&logoColor=white)
![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)

> A high-performance, gamified productivity web application built with **React**, **Vite**, and **Tailwind CSS**. Designed with an expressive Gen Z aesthetic, Instagram-inspired mobile bottom navigation, customizable themes, daily streaks, XP progression, and a deep-work Focus session timer.

---

## 🌟 Key Features

- **🎮 Gamified XP & Progression Engine**: Earn XP on task completion (bonus for high priority), unlock level titles (from *Novice Tasker* to *Flow God*), and maintain daily streaks with micro-celebration animations.
- **📱 Instagram-Inspired Mobile Navigation**: Responsive layout with a 5-item bottom navigation bar on mobile ($\le$ 600px) featuring an elevated floating action button (FAB) for instant task creation, safe-area inset support, and active indicators. Retains a deep navy sidebar on desktop viewports.
- **🎧 Interactive Focus View & Pomodoro Timer**: Dedicated Focus screen featuring 25m/15m/5m presets, pulsing glow state rings, XP bonus rewards on completion, and urgent priority task queues.
- **🎨 3 Curated Themes**: Instant theme switching between **Light**, **Dark**, and **Midnight Purple** with CSS variable design tokens and persistent `localStorage` preference memory.
- **⚡ Comprehensive Task Management**:
  - Filter tasks by status (*All*, *Pending*, *Completed*), category (*Work*, *Design*, *Development*, *Personal*, *Health*), and priority (*High*, *Medium*, *Low*).
  - Search with real-time matching and `/` keyboard shortcut.
  - Grid and List display modes.
  - Undo action support for task deletion and status toggles.
- **👤 Customizable User Profile**: Select custom avatar personas, edit display name and bio, and track completed milestone achievements.
- **🚀 Automated CI/CD Deployment**: Ready-to-go GitHub Actions workflow (`.github/workflows/main.yml`) that automatically builds, tests, and deploys the app to **GitHub Pages** on push.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, JavaScript (ESNext), React Hooks
- **Backend**: Node.js, Express.js REST API, CORS middleware
- **Database & Storage**: Atomic JSON file-backed database (`server/data/db.json`) + Client-side LocalStorage offline resilience
- **Bundler & Dev Server**: Vite 8 with `/api` reverse proxying
- **Styling**: Tailwind CSS v4, Custom CSS Variables, Glassmorphism Backdrop Blurs
- **Authentication**: Salted PBKDF2 Password Hashing & Bearer Session Tokens
- **Icons**: Lucide React
- **CI/CD**: GitHub Actions (`.github/workflows/main.yml`)

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### 1. Clone the repository
```bash
git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
cd <YOUR-REPO-NAME>
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run fullstack development (Frontend + Backend)
```bash
npm run dev:all
```
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000) (Proxied via `/api`)

Alternatively, run them separately:
- `npm run dev` — Starts Vite dev server on port 3000
- `npm run server` — Starts Express backend API server on port 5000
- `npm run server:watch` — Starts backend with live file reload

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check and server status |
| `GET` | `/api/tasks` | Get all tasks (supports `?category=`, `?status=`, `?priority=`, `?search=`, `?sortBy=`) |
| `GET` | `/api/tasks/:id` | Get single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Full update of task |
| `PATCH` | `/api/tasks/:id` | Partial update (toggle complete, priority, etc.) |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `POST` | `/api/tasks/clear-completed` | Bulk remove completed tasks |
| `POST` | `/api/tasks/reset` | Restore initial sample demo dataset |
| `GET` | `/api/stats` | Aggregated dashboard analytics & completion rates |
| `GET` | `/api/profile` | Retrieve user profile, XP & gamification records |
| `PUT` | `/api/profile` | Update profile avatar, name, and bio |
| `POST` | `/api/profile/xp` | Award XP bonus |
| `GET` | `/api/settings` | Get user settings |
| `PUT` | `/api/settings` | Update user settings |
| `POST` | `/api/auth/register` | Register new user account (PBKDF2 salted hash) |
| `POST` | `/api/auth/login` | Authenticate user and generate session token |
| `GET` | `/api/auth/me` | Fetch authenticated session user |

### 4. Build for production
```bash
npm run build
```
Compiled production files will be output to the `./dist` directory.

---

## 📦 How to Push to Your GitHub & Deploy

Follow these steps to upload the project to your GitHub account and activate free hosting:

### Step 1: Create a new repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Enter a repository name (e.g. `taskflow` or `taskflow-react`).
3. Set the repository to **Public** and leave "Add a README" **unchecked**.
4. Click **Create repository**.

### Step 2: Initialize Git and push your code
Run these commands in your project directory:

```bash
# 1. Initialize git if not already initialized
git init

# 2. Stage all project files
git add .

# 3. Create your initial commit
git commit -m "feat: initial release of TaskFlow productivity app"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# 6. Push code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages (Automated Deployment)
1. On your GitHub repository page, go to **Settings** > **Pages** (in the left sidebar).
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Go to the **Actions** tab at the top of your repository. You will see the **Build and Deploy TaskFlow** workflow running automatically!
4. Once completed (green checkmark), your live site will be accessible at:
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 📄 Resume Project Highlights (Copy & Paste)

You can feature this project on your resume with these bullet points:

- **TaskFlow — Gamified Productivity Web Application | React, Vite, Tailwind CSS, GitHub Actions**
  - Architected a responsive productivity web app with React 19, custom CSS variables, and persistent LocalStorage state management.
  - Engineered an Instagram-inspired mobile bottom navigation bar with accessible touch targets ($\ge 44\text{px}$), safe-area insets, and an elevated action button.
  - Integrated a gamification engine with dynamic XP calculations, daily streaks, level progression milestones, and interactive Pomodoro focus sessions.
  - Built an automated GitHub Actions CI/CD pipeline (`main.yml`) verifying lint rules and deploying production builds to GitHub Pages on every release.

---

## 📝 License
Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
