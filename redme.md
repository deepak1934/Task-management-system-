# Task Management Backend

This is a backend Task Management system built using **Node.js, Express.js, and MySQL**.

The database is hosted on **Railway MySQL**, and authentication is implemented using **OTP + JWT**.

---

## 🛠️ Tech Used

- Node.js
- Express.js
- Railway MySQL Database
- JWT Authentication
- Swagger API Documentation

---

## ⚙️ Steps to Run the Project Locally

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPO_LINK>
cd project-folder


# install dependencies 

npm install 

# create the .env file insert the url of your my sql
PORT=5000 // use your port

MYSQL_URL= -----------

JWT_SECRET=supersecretkey


#run the server 
npm run dev

# swagger documentation available at 
http://localhost:5000/api-docs


# hosted backend url 
