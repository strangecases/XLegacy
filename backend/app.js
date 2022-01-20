import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";

connectDB();

const app = express();

// body-parser for parsing req.body
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("bye");
});

app.listen(3000, () => {
    console.log("Listening at port:3000");
});
