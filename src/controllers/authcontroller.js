const db = require("../config/db");
const generateOtp = require("../utils/gotp");
const jwt = require("jsonwebtoken");
const logActivity = require("../utils/logActive"); 

async function requestOtp(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOtp();
  const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

  const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (user.length === 0) {
    await db.query(
      "INSERT INTO users (email, otp, otp_expiry) VALUES (?, ?, ?)",
      [email, otp, expiryTime]
    );
  } else {
    await db.query(
      "UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?",
      [otp, expiryTime, email]
    );
  }

  console.log("Generated OTP:", otp);

await logActivity(null, "OTP_REQUEST", req);

  res.json({ message: "OTP sent successfully" });
}

async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (user.length === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const currentUser = user[0];

  if (String(currentUser.otp) !== String(otp)) {
    await logActivity(null, "OTP_VERIFY_FAIL", { email });
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (new Date(currentUser.otp_expiry) < new Date()) {
    await logActivity(null, "OTP_VERIFY_FAIL", { email });
    return res.status(400).json({ message: "OTP expired" });
  }

  const token = jwt.sign(
    { userId: currentUser.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

await logActivity(currentUser.id, "OTP_VERIFY_SUCCESS", req);

  res.json({ message: "Login successful", token });
}

module.exports = {
  requestOtp,
  verifyOtp,
};
