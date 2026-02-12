const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: authroutes
 *   description: for authentication like verifying and requesting otp
 */

const { otpLimiter } = require("../middleware/ratelimit");
const { requestOtp, verifyOtp } = require("../controllers/authcontroller");

/**
 * @swagger
 * /api/auth/request-otp :
 *   post:
 *     summary: Request OTP using email
 *     tags: [Auth]
 */


router.post("/request-otp", otpLimiter, requestOtp);

/**
 * @swagger
 *  /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP using the email and the otp  and get JWT token
 *     tags: [Auth]
 */

router.post("/verify-otp", otpLimiter, verifyOtp);

module.exports = router;
