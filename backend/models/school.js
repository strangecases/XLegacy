import mongoose from "mongoose";

const { Schema } = mongoose;

const schoolSchema = new Schema({
    schoolName: {
        type: String,
        required: true,
    },
    schoolCode: {
        type: String,
        required: true,
    },
    classes: [
        {
            classNo: String,
            groups: [{ group: String }],
        },
    ],
    tests: {},
});

export default mongoose.model("School", schoolSchema);
