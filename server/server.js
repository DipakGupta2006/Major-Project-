const express = require("express")
const app = express();
const path = require("path")


app.get("/", (req, res) => {
    res.send("hello server")
})

app.listen(3000, () => {
    console.log("server running at port 300");
    
})