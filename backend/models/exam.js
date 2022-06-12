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
    parentsPhNo: {
        type: String,
        trim: true,
        validate: {
            validator(v) {
                return /^$|^\d{10}$/.test(v);
            },
            message: "Phone no is not valid.",
        },
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
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
    },
    testId: {
        type: Schema.Types.ObjectId,
        ref: "Test",
    },
});

export default mongoose.model("Exam", examSchema);
