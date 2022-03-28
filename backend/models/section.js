import mongoose from "mongoose";

const { Schema } = mongoose;

const sectionSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    questions: [
        {
            questionNumber: {
                type: Number,
                required: true,
            },
            question: {
                type: String,
                required: true,
            },
            options: {
                1: { type: String, required: true },
                2: { type: String, required: true },
                3: { type: String, required: true },
                4: { type: String, required: true },
            },
            answer: {
                type: Number,
                required: true,
            },
        },
    ],
});

export default mongoose.model("Section", sectionSchema);
