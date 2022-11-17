import mongoose from "mongoose";
import Test from "./test.js";

// const arrayLimit = (val) => {
//     console.log("val", val.length);
//     return val.length < 5;
// };

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
    // classes: {
    //     type: [
    //         {
    //             classNo: String,
    //             groups: [{ group: String, _id: false }],
    //             _id: false,
    //         },
    //     ],
    //     validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
    // },
    tests: {},
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
    },
    otherTestsClassMsg: {
        type: String,
        default: "",
    },
});

schoolSchema.post("findOneAndDelete", async (doc) => {
    if (doc) {
        doc.classes.forEach((cls) => {
            //             console.log(
            //                 "ddshfjsdjsjdlw;kd",
            //                 cls.classNo,
            //                 doc.tests[cls.classNo]
            //             );

            let years = [];
            if (doc.tests[cls.classNo])
                years = Object.keys(doc.tests[cls.classNo]);

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
