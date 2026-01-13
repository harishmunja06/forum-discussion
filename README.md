# Forum Discussion 🗣️

A full-stack **MERN-based discussion forum** where users can register, log in, create threads, comment, and interact based on roles and permissions.

---

## 🚀 Features

- User Authentication (Signup & Login)
- JWT-based Authorization
- Role-based Access Control (Admin / Moderator / Community Member)
- Create and manage discussion threads
- Comment on threads
- Protected routes
- Password hashing using bcrypt
- MongoDB database integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS
- Context API / Hooks

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

---

## 📁 Project Structure

Forum101/
├── React/
│ └── client/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── server/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── models/
│ ├── database/
│ ├── .env
│ └── index.js
│
├── .gitignore
├── README.md
└── package.json


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/harishmunja06/forum-dicussion.git
cd forum-dicussion
2️⃣ Backend Setup
bash
cd server
npm install
Create a .env file inside server/:

env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_email_password
Start backend:

bash
npm start
Backend runs on:

arduino

http://localhost:4000
3️⃣ Frontend Setup
bash

cd React/client
npm install
npm start
Frontend runs on:

http://localhost:3000
4️⃣ Run Both Frontend & Backend (Optional)
From project root:
npm run dev

🔐 API Endpoints (Sample)
Method	Endpoint	Description
POST	/signup	Register user
POST	/login	Login user
GET	/todos	Fetch todos
POST	/threads	Create thread
POST	/threads/:id/comments	Add comment

🧪 Authentication Flow
User signs up

Password is hashed using bcrypt

JWT token generated on login

Token used to access protected routes

Role-based permissions enforced

🚫 Security Notes
.env file is not committed

Passwords are hashed

JWT tokens expire automatically

Role-based authorization enforced via middleware

📌 Future Improvements
Pagination for threads

Search & filter discussions

User profile editing

File uploads

Deployment (Render / Netlify)

👨‍💻 Author
Harish Munja
GitHub: https://github.com/harishmunja06
