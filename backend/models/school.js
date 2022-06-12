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
        unique: true,
    },
    schoolPhNo: {
        type: String,
        trim: true,
        validate: {
            validator(v) {
                return /^$|^\d{10}$/.test(v);
            },
            message: "not a valid phone no",
        },
    },
    schoolAddress: {
        type: String,
    },
    classes: [
        {
            classNo: String,
            groups: [{ group: String, _id: false }],
            _id: false,
        },
    ],
    tests: {},
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
    },
});

export default mongoose.model("School", schoolSchema);
