const db = require("../config/db");
const logActivity = require("../utils/logActive"); 

// CREATE TASK
async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const [result] = await db.query(
      "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
      [userId, title, description || null]
    );

    await logActivity(userId, "TASK_CREATED", req);

    res.status(201).json({
      message: "Task created successfully",
      taskId: result.insertId,
    });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


// GET ALL TASKS
async function getTasks(req, res) {
  try {
    const userId = req.user.userId;

    const [tasks] = await db.query(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    res.json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


// UPDATE TASK
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.user.userId;

    if (!title && !description) {
      return res.status(400).json({
        message: "At least one field (title/description) is required",
      });
    }

    const [result] = await db.query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?",
      [title || null, description || null, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    await logActivity(userId, "TASK_UPDATED", req);

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


async function deleteTask(req, res) {
  try {
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
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
