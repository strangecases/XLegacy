import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import test from "./routes/test.js";

connectDB();

const app = express();

/* body-parser for parsing req.body, 
   morgan for logging requests
*/
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", test);

// app.get("/", (req, res) => {
//     res.send("bye");
// });

app.listen(8000, () => {
    console.log("Listening at port:3000");
});
