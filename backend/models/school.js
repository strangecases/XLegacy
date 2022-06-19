import mongoose from "mongoose";
import Test from "./test.js";

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

schoolSchema.post("findOneAndDelete", async (doc) => {
    if (doc) {
        doc.classes.forEach((cls) => {
            const years = Object.keys(doc.tests[cls.classNo]);
            years.forEach(async (year) => {
                if (doc.tests[cls.classNo][year].length > 0)
                    doc.tests[cls.classNo][year].forEach(async (test) => {
                        await Test.findByIdAndDelete(test);
                    });
            });
        });
    }
});

export default mongoose.model("School", schoolSchema);
