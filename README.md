Below is **final polished README content** — **proper formatting, perfect English, zero placeholders, no changes needed**.
Just **copy–paste directly into README.md** ✔

---

# 📝 Task Manager App

A modern and responsive **Task Manager Web Application** built using **Next.js, React.js, Tailwind CSS, and NextAuth.js**.
This application allows users to **create, update, delete, and manage tasks** easily through a clean dashboard and an interactive Kanban board with drag-and-drop support.

---

## 🚀 Features

### 🔐 Authentication

* Secure login and registration using **NextAuth.js**
* Session-based authentication
* Protected routes for dashboard, tasks, and user pages

### 📋 Task Management

* Add new tasks
* Edit existing tasks
* Delete tasks
* View all tasks in categorized sections
* Real-time UI updates

### 🗂️ Kanban Board

* Drag-and-drop task movement between columns
* Columns: **To Do**, **In Progress**, **Completed**
* Automatic status update when moved

### 🖥️ Dashboard

* Clean and simple interface
* Quick overview of tasks
* Easy navigation to all pages

### 🎨 Modern UI

* Built using **Next.js App Router**
* Styled with **Tailwind CSS**
* Fully responsive on all screen sizes

### 🔌 API Architecture

* APIs created inside Next.js `/app/api/`
* Handles authentication and task operations
* Returns JSON responses with proper validation and error handling

---

## 🏗️ Tech Stack

* **Next.js (App Router)**
* **React.js**
* **Tailwind CSS**
* **NextAuth.js**
* **TypeScript**

---

## 📁 Folder Structure

```
src/
 └── app/
      ├── api/
      │    └── auth/[...nextauth]/route.ts      → Handles user authentication
      │
      ├── dashboard/page.tsx                    → Dashboard page
      ├── home/page.tsx                         → Home page
      ├── kanban/page.tsx                       → Kanban drag-and-drop board
      ├── login/page.tsx                        → Login page
      ├── register/page.tsx                     → Registration page
      └── user/page.tsx                         → User profile page

public/                                        → Static assets
```

---

## ⚙️ How to Run Locally

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start development server

```
npm run dev
```

### 3️⃣ Open the project in browser

```
http://localhost:3000
```

---

## 🔄 API Endpoints Overview

| Endpoint                  | Method     | Description                             |
| ------------------------- | ---------- | --------------------------------------- |
| `/api/auth/[...nextauth]` | GET / POST | Authentication (login, logout, session) |
| `/api/tasks`              | GET        | Fetch all tasks                         |
| `/api/tasks`              | POST       | Create a new task                       |
| `/api/tasks/:id`          | PUT        | Update a task                           |
| `/api/tasks/:id`          | DELETE     | Delete a task                           |

---

## 🧩 How Drag-and-Drop Works

* Implemented using **React DnD**
* Each task card is draggable
* Each column is a droppable area
* When a task is dropped into a new column, its status updates
* UI automatically re-renders with the new position

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Create a pull request

---

## 📄 License

This project is licensed under the **MIT License**.


