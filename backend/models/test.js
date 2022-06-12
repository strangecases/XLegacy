import mongoose from "mongoose";
import Section from "./section.js";

const { Schema } = mongoose;

const testSchema = new Schema(
    {
        testTitle: {
            type: String,
            required: true,
        },
        testTime: {
            type: Number,
            required: true,
        },
        classNo: {
            type: Number,
            required: true,
        },
        testCode: {
            type: String,
            required: true,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Admin",
        },

        sectionData: {
            type: [
                {
                    subject: String,
                    sectionNo: Number,
                    sectionDescription: String,
                    sectionId: String,
                    _id: false,
                },
            ],
        },
        sections: [
            {
                type: Schema.Types.ObjectId,
                ref: "Section",
            },
        ],
        school: {
            type: Schema.Types.ObjectId,
            ref: "School",
        },
    },
    { timestamps: true }
);

testSchema.post("findOneAndDelete", async (doc) => {
    if (doc) {
        await Section.deleteMany({
            _id: {
                $in: doc.sections,
            },
        });
    }
});

export default mongoose.model("Test", testSchema);
