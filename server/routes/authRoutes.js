const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const svgCaptcha = require("svg-captcha");
const crypto = require("crypto");
const { sendOtpEmail } = require("../utils/sendEmail");
const captchaStore = require("../utils/captchaStore");

const {
    registerUser,
    loginUser,
    sendOtp,
    verifyOtp,
    setSecurityQuestions,
    getCaptcha,
} = require("../controllers/authController");

router.get("/captcha", getCaptcha);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/set-security-questions", setSecurityQuestions);

module.exports = router;