const rateLimit = require("express-rate-limit");


const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5,                  
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "too many attempts try again later" },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200,                
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "too many attempts try again later" },
});

module.exports = { otpLimiter, apiLimiter };
