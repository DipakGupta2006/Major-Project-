require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");


app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

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