/* eslint-disable import/first */
import "dotenv/config";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import csrf from "csurf";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import test from "./routes/test.js";
import section from "./routes/section.js";
import auth from "./routes/auth.js";
import exam from "./routes/exam.js";
import school from "./routes/school.js";

connectDB();

const app = express();

/* body-parser for parsing req.body, 
   morgan for logging requests
*/
// apply middleware

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// routes

app.use("/api", auth);
app.use("/api/schools", school);
app.use("/api/schools", test);
app.use("/api/tests", section);
app.use("/api/schools", exam);

// csrf
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// csrf endpoint
app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// app.get("/", (req, res) => {
//     res.send("bye");
// });

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Oh No, Something Went Wrong!" } = err;
    res.status(statusCode).send(message);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Listening at port:${port}`);
});
