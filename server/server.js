require('dotenv').config();
const pool = require("./config/db");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { hashPassword } = require("./utils/hash");
const { comparePassword } = require("./utils/hash");
const { generateAccessToken, generateRefreshToken } = require("./utils/generateTokens");
const svgCaptcha = require("svg-captcha");
const crypto = require("crypto");
const { sendOtpEmail } = require('./utils/sendEmail');


// all builtin middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// for temporary memory storage
const captchaStore = new Map();


app.get("/", (req, res) => {
    res.json({
        message: "Server is running",
        status: "Success",
        success: true
    });
});

app.post("/register", async (req, res) => {
    try {
        const { username, email, password, confirm_password, accepted_terms, captchaId, captchaAnswer } = req.body;

        if (!captchaId || !captchaAnswer) {
            return res.status(400).json({
                success: false,
                message: "Captcha is required",
            });
        }
        const storedCaptcha = captchaStore.get(captchaId);
        if (!storedCaptcha) {
            return res.status(400).json({
                success: false,
                message: "Captcha expired or invalid, please try again",
            });
        }

        if (Date.now() > storedCaptcha.expiresAt) {
            captchaStore.delete(captchaId);
            return res.status(400).json({
                success: false,
                message: "Captcha expired, please try again",
            });
        }

        if (storedCaptcha.text.toLowerCase() !== captchaAnswer.toLowerCase()) {
            return res.status(400).json({
                success: false,
                message: "Captcha incorrect",
            });
        }
        captchaStore.delete(captchaId);

        if (!username || !email || !password || !confirm_password || accepted_terms === false) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid input"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        if (password !== confirm_password) {
            return res.status(400).json({
                success: false,
                message: "Password is not matched"
            });
        }

        const [existingUser] = await pool.query("SELECT id FROM users WHERE email = ? OR username = ?", [email, username]);
        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Username or email already registered",
            });
        }

        const hashedPassword = await hashPassword(password);

        const [result] = await pool.query("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", [username, email, hashedPassword]);

        return res.status(201).json({
            success: true,
            message: "Account created. Please verify your email.",
            userId: result.insertId,
        });

    } catch (error) {
        console.error("Register error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again",
        });
    }
});

app.post("/set-security-questions", async (req, res) => {
    try {

        const { userId, questions } = req.body;

        const [existingUser] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
        if (existingUser.length !== 1) {
            return res.status(409).json({
                success: false,
                message: "User not Found",
            });
        }
        if (questions.length !== 5) {
            return res.status(409).json({
                success: false,
                message: "Question not found",
            });
        }

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].question.trim() === "") {
                return res.status(409).json({
                    success: false,
                    message: "Question not Found",
                });
            }
            if (questions[i].answer.trim() === "") {
                return res.status(409).json({
                    success: false,
                    message: `Fill the empty question (question number - ${i + 1}) correctly`,
                });
            }
        }

        for (const q of questions) {
            const hashedAnswer = await hashPassword(q.answer);
            await pool.query(
                "INSERT INTO security_questions (user_id, question, answer_hash) VALUES (?, ?, ?)",
                [userId, q.question, hashedAnswer]
            );
        }
        return res.status(201).json({
            success: true,
            message: "Security questions saved successfully",
        });

    } catch (error) {
        console.error("Set-security-questions error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again",
        });
    }
});

app.get("/captcha", (req, res) => {
    const captcha = svgCaptcha.create({
        size: 6,
        noise: 3,
        color: true,
        background: "#f4f4f4",
    });

    const captchaId = crypto.randomUUID();

    captchaStore.set(captchaId, {
        text: captcha.text,
        expiresAt: Date.now() + 5 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        captchaId,
        svg: captcha.data,
    });
});

app.post("/send-otp", async (req, res) => {
    try {
        const { userId } = req.body;

        const [existingUser] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
        if (existingUser.length !== 1) {
            return res.status(400).json({
                success: false,
                message: "User not exists",
            });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        await pool.query("DELETE FROM otp_tokens WHERE user_id = ?", [userId]);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await pool.query(
            "INSERT INTO otp_tokens (user_id, otp, expires_at) VALUES (?, ?, ?)",
            [userId, otp, expiresAt]
        );

        const userEmail = existingUser[0].email;
        await sendOtpEmail(userEmail, otp);

        return res.status(201).json({
            success: true,
            message: "OTP send sucessfully",
        });

    } catch (error) {
        console.error("Send OTP error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

app.post("/verify-otp", async (req, res) => {
    try {
        const { userId, otp } = req.body;

        if (!userId || !otp) {
            return res.status(400).json({
                success: false,
                message: "userId and OTP are required",
            });
        }

        const otpString = String(otp);

        const [rows] = await pool.query(
            "SELECT * FROM otp_tokens WHERE user_id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found, please request a new one",
            });
        }

        const otpRecord = rows[0];

        if (new Date() > new Date(otpRecord.expires_at)) {
            await pool.query("DELETE FROM otp_tokens WHERE user_id = ?", [userId]);
            return res.status(400).json({
                success: false,
                message: "OTP expired, please request a new one",
            });
        }

        if (otpRecord.otp !== otpString) {
            return res.status(400).json({
                success: false,
                message: "Incorrect OTP",
            });
        }

        await pool.query("UPDATE users SET is_verified = TRUE WHERE id = ?", [userId]);
        await pool.query("DELETE FROM otp_tokens WHERE user_id = ?", [userId]);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });

    } catch (error) {
        console.error("Verify OTP error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid inputs",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const user = existingUser[0];

        if (user.locked_until && new Date() < new Date(user.locked_until)) {
            const remainingMs = new Date(user.locked_until) - new Date();
            const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));

            return res.status(403).json({
                success: false,
                message: `Account locked, try again after ${remainingMinutes} minute(s)`,
            });
        }

        if (user.is_verified === 0) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email first",
            });
        }

        const isPasswordCorrect = await comparePassword(password, user.password_hash);

        if (!isPasswordCorrect) {
            await pool.query(
                "UPDATE users SET failed_attempts = failed_attempts + 1 WHERE email = ?",
                [email]
            );

            const [rows] = await pool.query(
                "SELECT failed_attempts FROM users WHERE email = ?",
                [email]
            );
            const currentAttempts = rows[0].failed_attempts;

            if (currentAttempts >= 3) {
                const lockUntil = new Date(Date.now() + 5 * 60 * 1000); // abhi + 5 min

                await pool.query(
                    "UPDATE users SET locked_until = ?, failed_attempts = 0 WHERE email = ?",
                    [lockUntil, email]
                );

                return res.status(403).json({
                    success: false,
                    message: "Too many failed attempts. Account locked for 5 minutes.",
                });
            }

            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // password sahi hai
        await pool.query(
            "UPDATE users SET failed_attempts = 0, last_login = NOW() WHERE email = ?",
            [email]
        );

        const payload = { id: user.id, username: user.username };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user: { id: user.id, username: user.username, email: user.email },
        });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

app.listen(port, () => {
    console.log(`server running at port ${port}`);

})