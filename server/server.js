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
// const { generateAccessToken, generateRefreshToken } = require("./utils/generateTokens");
const svgCaptcha = require("svg-captcha");
const crypto = require("crypto");


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
            })
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


app.listen(port, () => {
    console.log(`server running at port ${port}`);

})