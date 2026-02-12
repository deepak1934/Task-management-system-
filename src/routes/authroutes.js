const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: OTP login APIs
 */

/**
 * @swagger
 * /api/auth/request-otp:
 *   post:
 *     summary: Request OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *     responses:
 *       200:
 *         description: OTP sent
 */

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               otp:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Token generated
 */

const { otpLimiter } = require("../middleware/ratelimit");
const { requestOtp, verifyOtp } = require("../controllers/authcontroller");


router.post("/request-otp", otpLimiter, requestOtp);


router.post("/verify-otp", otpLimiter, verifyOtp);

module.exports = router;
