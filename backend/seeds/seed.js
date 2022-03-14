import mongoose from "mongoose";
import Section from "../models/section.js";

mongoose.connect("mongodb://localhost:27017/test-seed", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const q = [
    {
        questionNumber: 1,
        question: "what is root of 4",
        options: {
            1: "four",
            2: "two",
            3: "one",
            4: "zero",
        },
        answer: 2,
    },
    {
        questionNumber: 2,
        question: "what is root of 9",
        options: {
            1: "four",
            2: "two",
            3: "three",
            4: "zero",
        },
        answer: 3,
    },
    {
        questionNumber: 3,
        question: "what is root of 1 minus 1",
        options: {
            1: "four",
            2: "two",
            3: "one",
            4: "zero",
        },
        answer: 4,
    },
];

const seedDB = async () => {
    await Section.deleteMany({});
    const section = new Section({
        subject: "Physics",
        questions: q,
    });
    await section.save();
};

seedDB().then(() => {
    mongoose.connection.close();
});
