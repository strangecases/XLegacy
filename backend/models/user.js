import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: [true, "username is already taken try new name"],
        },
        age: {
            type: Number,
        },
        phoneNo: {
            type: String,
            trim: true,
            validate: {
                validator(v) {
                    return /^$|^\d{10}$/.test(v);
                },
                message: "not a valid phone no",
            },
        },
        address: {
            type: String,
        },
        schoolId: {
            type: Schema.Types.ObjectId,
            ref: "School",
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        role: {
            type: String,
            required: true,
            enum: ["Principle", "Teacher", "Student"],
        },
    },
    { discriminatorKey: "kind" }
);

const User = mongoose.model("User", userSchema);
export default User;
