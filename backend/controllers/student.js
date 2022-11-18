import jwt from "jsonwebtoken";
import StudentUser from "../models/student.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
import ExpressError from "../utils/ExpressError.js";

export const studentRegister = async (req, res) => {
    const { username, age, password, classNo, group } = req.body;

    // validation
    if (!username) throw new ExpressError("Name is required", 400);

    if (!password || password.length < 6) {
        throw new ExpressError(
            "Password is required and should be minimum 6 charechters long",
            400
        );
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // register student
    const student = await new StudentUser({
        username,
        age,
        password: hashedPassword,
        classNo,
        group,
        role: "Student",
    });

    await student.save();

    return res.json({ ok: true });
};

export const studentLogin = async (req, res) => {
    const { username, password } = req.body;

    // check if our db has student with that username
    const student = await StudentUser.findOne({ username }).exec();
    if (!student) throw new ExpressError("No student found", 400);

    // compare password
    const match = await comparePassword(password, student.password);
    if (!match) throw new ExpressError("Wrong Password", 400);

    // create signed JWT
    const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // return student and token to client, exclude hashed password
    student.password = undefined;

    // send token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" && true,
        sameSite: process.env.NODE_ENV === "production" && "none",
    });

    // send student as json response
    return res.json(student);
};

export const studentLogout = async (req, res) => {
    res.clearCookie("token", {
        secure: process.env.NODE_ENV === "production" && true,
        sameSite: process.env.NODE_ENV === "production" && "none",
    });
    return res.json({ message: "signout success" });
};

export const iscurrentStudent = async (req, res) => {
    const student = await StudentUser.findById(req.user._id).exec();

    if (!student) {
        throw new ExpressError("Only Teachers can access this route", 400);
    }

    return res.json({ ok: true });
};
