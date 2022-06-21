import mongoose from "mongoose";

let db;

if (process.env.NODE_ENV === "production") {
    db = process.env.DB_URL;
} else {
    db = process.env.DATABASE;
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
