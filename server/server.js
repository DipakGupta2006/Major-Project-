require('dotenv').config();
const pool = require("./config/db");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
const { hashPassword } = require("./utils/hash");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



app.get("/", (req, res) => {
    res.json({
        message: "Server is running",
        status: "Success",
        success: true
    });
});

app.post("/register", async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if(!username || !email || !password || !confirm_password){
        return res.status(400).json({
            success: false,
            message: "Enter a valid input"
        });
    }

    if(password.length < 8){
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters"
        })
    }

    if(password !== confirm_password){
        return res.status(400).json({
            success: false,
            message: "Password is not matched"
        });
    }
});


app.listen(port, () => {
    console.log(`server running at port ${port}`);

})