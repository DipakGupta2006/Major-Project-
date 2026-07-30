require('dotenv').config()
const pool = require("./db");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

pool.getConnection()
    .then((conn) => {
        console.log("MySQL connected successfully");
        conn.release();
    })
    .catch((err) => {
        console.error("MySQL connection failed:", err.message);
    });

app.get("/", (req, res) => {
    res.json({
        message: "Server is running",
        status: "Success",
        sucess: true
    });
});

app.listen(port, () => {
    console.log(`server running at port ${port}`);
    
})