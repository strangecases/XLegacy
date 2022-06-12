import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: [true, "Name is already taken try new name"],
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: [true, "Email is already taken try another email"],
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

// adminSchema.path("email").validate(async (email) => {
//     await mongoose.models.Admin.findOne({ email }, (err, admin) => {
//         if (!admin) return true;
//         return false;
//     });
// }, "Email already taken, try another");

export default mongoose.model("Admin", adminSchema);
