import mongoose from "mongoose";

const { Schema } = mongoose;

const examSchema = new Schema({
    schoolCode: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    classNo: {
        type: Number,
        required: true,
    },
    classGroup: {
        type: String,
    },
    answers: {},
    marks: {
        type: Number,
        default: 0,
        // required: true,
    },
});

export default mongoose.model("Exam", examSchema);
