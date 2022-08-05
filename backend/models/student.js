import mongoose from "mongoose";
import User from "./user.js";

const { Schema } = mongoose;

const teacherSchema = new Schema({
    classid: {
        type: Schema.Types.ObjectId,
        ref: "Classes",
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
    },
    classNo: {
        type: Number,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
});

const StudentUser = User.discriminator("Student", teacherSchema);

export default StudentUser;
