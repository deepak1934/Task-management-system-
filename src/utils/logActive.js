const db = require("../config/db");

async function logActivity(userId, action, req = null) {
  try {
    const ip = req ? req.ip : null;

    await db.query(
      "INSERT INTO activity_logs (user_id, action, ip_address) VALUES (?, ?, ?)",
      [userId || null, action, ip]
    );
  } catch (err) {
    console.error("Activity logging failed:", err.message);
  }
}

module.exports = logActivity;
