const rateLimit = require("express-rate-limit");


const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5,                  
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "too many attempts try again later" },
});

// General for API endpoints (tasks etc.)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,                 // 200 requests per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "too many attempts try again later" },
});

module.exports = { otpLimiter, apiLimiter };
