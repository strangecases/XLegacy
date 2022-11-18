import mongoose from "mongoose";
import User from "./user.js";

const { Schema } = mongoose;

const teacherSchema = new Schema({
    classTeacherid: {
        type: Schema.Types.ObjectId,
        ref: "Classes",
    },
    groupTeacherId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
    },
    classTeacherNo: {
        type: Number,
    },
    groupTeacher: {
        type: String,
    },
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

const TeacherUser = User.discriminator("Teacher", teacherSchema);

export default TeacherUser;
