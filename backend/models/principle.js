import mongoose from "mongoose";
import User from "./user.js";

const { Schema } = mongoose;

const principleSchema = new Schema({
    // teachingClasses: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Group",
    //     },
    // ],
    // TeachingSubjects: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Subject",
    //     },
    // ],
    teachingClasses: [
        {
            groupId: {
                type: Schema.Types.ObjectId,
                ref: "Group",
            },
            subjectId: {
                type: Schema.Types.ObjectId,
                ref: "Subject",
            },
            group: { type: String },
            subject: { type: String },
        },
    ],
});

const PrincipleUser = User.discriminator("Principle", principleSchema);

export default PrincipleUser;
