require("dotenv").config();
const express = require("express");
const db = require("./src/config/db");
const initDB = require("./src/config/initdb");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");


const app = express();
app.use(express.json());

const authRoutes = require("./src/routes/authroutes");
app.use("/api/auth", authRoutes);

const taskRoutes = require("./src/routes/taskroutes");
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await db.getConnection();
    console.log("Database connected");

    await initDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
}

startServer();


