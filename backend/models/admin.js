import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true,
        },
        passwordResetCode: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
