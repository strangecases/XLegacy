import mongoose from "mongoose";

const { Schema } = mongoose;

const sectionSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    sectionNo: {
        type: Number,
        required: true,
    },
    sectionDescription: {
        type: String,
        required: true,
    },
    questions: [
        {
            questionNo: {
                type: Number,
                required: true,
            },
            question: {
                type: String,
                required: true,
            },
            options: {
                a: { type: String, required: true },
                b: { type: String, required: true },
                c: { type: String, required: true },
                d: { type: String, required: true },
            },
            answer: {
                type: String,
                required: true,
            },
            _id: false,
        },
    ],
});

export default mongoose.model("Section", sectionSchema);
