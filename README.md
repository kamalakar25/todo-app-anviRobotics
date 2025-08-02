

# 📝 MERN Todo App with MongoDB & JWT Authentication

A full-stack Todo application built with the MERN stack, featuring secure JWT-based authentication, responsive Bootstrap UI, and user-specific todo management.

---

## 🚀 Features

- 🔐 **User Authentication** (Signup/Login with JWT)
- 🗂️ **User-Specific Todos** (Create, Edit, Delete)
- 💾 **MongoDB Database** (Local storage, no cloud memory)
- 🎨 **Responsive UI** using Bootstrap 5
- 🔄 **Session Persistence** via localStorage
- 🧼 **Clean Architecture** with modular backend routes and middleware

---

## 🧰 Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Frontend    | React + Bootstrap |
| Backend     | Express.js        |
| Database    | MongoDB            |
| Auth        | JWT + bcryptjs    |

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kamalakar25/todo-app-anviRobotics.git
cd todo-app-anviRobotics
```

### 2. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

---

## ⚙️ Running the App

### 1. Start the Backend

```bash
cd server
node server.js
```

> Runs on `http://localhost:5000`

### 2. Start the Frontend

```bash
cd ../client
npm start
```

> Runs on `http://localhost:3000`

---

## 🗃️ Project Structure

```
mern-todo/
├── client/           # React frontend
│   ├── components/   # AuthForm, TodoList, Navbar
│   ├── services/     # API calls
│   └── App.js
├── server/           # Express backend
│   ├── db/           # MongoDB Setup
│   ├── routes/       # Auth and Todo routes
│   ├── middleware/   # JWT auth middleware
│   └── server.js
```

---

## 🔐 Authentication Flow

- Users sign up with a unique username and password.
- Passwords are hashed using `bcrypt`.
- JWT token is issued on login and stored in `localStorage`.
- Protected routes validate token using middleware.

---

## 🧪 API Endpoints

### Auth

- `POST /signup` → Register new user
- `POST /login` → Authenticate and receive token

### Todos (Protected)

- `GET /todos` → Fetch user's todos
- `POST /todos` → Create new todo
- `PUT /todos/:id` → Update todo
- `DELETE /todos/:id` → Delete todo

> All `/todos` routes require `Authorization` header with JWT token.



## 🛡️ Security Notes

- JWT secret is stored locally (`authMiddleware.js`)
- MongoDB used for local persistence — no cloud memory
- Only authenticated users can access their own todos

---

## 📌 Future Improvements

- ✅ Add toast notifications for actions
- ✅ Use Bootstrap modals for editing todos
- 🔄 Add pagination or filtering
- 📱 Make UI fully mobile-friendly

---



## 🙌 Author

**Kamalakar**  
MERN Stack Developer  
kkamalakar512@gmail.com
+91 9603850529


