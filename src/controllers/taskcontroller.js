const db = require("../config/db");
const logActivity = require("../utils/logActive");



// delete Task  // URL: DELETE http://localhost:5000/api/tasks/:id
// get Tasks  // URL: GET http://localhost:5000/api/tasks
async function createTask(req, res) {
  const { title, description } = req.body;
  const userId = req.user.userId;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const [result] = await db.query(
    "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
    [userId, title, description]
  );

  await logActivity(userId, "TASK_CREATED", req);

  res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
}

/**
 * @swagger
 * 
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */


/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */

async function getTasks(req, res) {
  const userId = req.user.userId;

  const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [userId]);



  res.json(tasks);
}
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks of logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */

async function updateTask(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.user.userId;

  const [result] = await db.query(
    "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?",
    [title, description, id, userId]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  await logActivity(userId, "TASK_UPDATED", req);

  res.json({ message: "Task updated successfully" });
}

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */

async function deleteTask(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  const [result] = await db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, userId]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  await logActivity(userId, "TASK_DELETED", req);

  res.json({ message: "Task deleted successfully" });
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
