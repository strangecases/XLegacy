import mongoose from "mongoose";

const { Schema } = mongoose;

const testSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    sections: [
        {
            type: Schema.Types.ObjectId,
            ref: "Section",
        },
    ],
});

export default mongoose.model("Test", testSchema);
