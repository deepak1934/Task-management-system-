const express = require("express");
const router = express.Router();

const { apiLimiter } = require("../middleware/ratelimit");
const authenticateToken = require("../middleware/authmiddle");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskcontroller");

router.use(apiLimiter);

router.post("/", authenticateToken, createTask);
router.get("/", authenticateToken, getTasks);
router.put("/:id", authenticateToken, updateTask);
router.delete("/:id", authenticateToken, deleteTask);

module.exports = router;
