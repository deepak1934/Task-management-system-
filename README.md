# Task Management Backend (Node.js + MySQL)

This project is a Task Management backend built using **Node.js** and **Express.js** with **MySQL** as the database.  
It supports **OTP-based login**, **JWT authentication**, **Task CRUD**, **Rate limiting**, and **Activity logging**.  
API documentation is available using **Swagger**.



## 🔗 Links

### Hosted Backend URL (Render)
https://task-management-system-pq40.onrender.com

### API Documentation (Swagger)
https://task-management-system-pq40.onrender.com/api-docs

---

## 🧰 What is Railway?

**Railway** is a cloud platform that allows you to easily host services like **MySQL**, PostgreSQL, etc.  
In this project, the **MySQL database** is hosted on Railway and we connect to it using a connection string (`MYSQL_URL`).

---

## 🧰 What is Render?

**Render** is a cloud platform used to deploy backend applications like Node.js APIs.  
This project’s backend is deployed on **Render** and is publicly accessible using the hosted URL above.

> Note: Render free tier may go to sleep after inactivity. First request can take ~30–60 seconds (cold start).

---

## 🧾 What is Swagger?

**Swagger** provides a web UI to view and test APIs.  
You can:
- See all endpoints in one place
- Send requests directly from the browser using “Try it out”
- Add JWT token via the **Authorize** button for protected APIs

Swagger UI for this project:
- Local: http://localhost:5000/api-docs
- Hosted: https://task-management-system-pq40.onrender.com/api-docs

---

## ⚙️ How to Run Locally

#1) Clone the Repository
bash
git clone I completed my task .

Github Repo Link :- https://github.com/deepak1934/Task-management-system-.git

2) Install Dependencies
npm install

3) Create .env File

Create a .env file in the root folder and add:

PORT=5000
MYSQL_URL=mysql://username:password@host:port/database
JWT_SECRET=supersecretkey


✅ Example format (Railway gives you this connection string):

MYSQL_URL=mysql://root:password@gondola.proxy.rlwy.net:22491/railway

4) Run the Server
npm run dev




