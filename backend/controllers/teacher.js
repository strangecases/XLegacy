import jwt from "jsonwebtoken";
import TeacherUser from "../models/teacher.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
import ExpressError from "../utils/ExpressError.js";

export const teacherRegister = async (req, res) => {
    const { username, age, phoneNo, password } = req.body;

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

    // register teacher
    const teacher = await new TeacherUser({
        username,
        age,
        phoneNo,
        password: hashedPassword,
        role: "Teacher",
    });

    await teacher.save();

    return res.json({ ok: true });
};

export const teacherLogin = async (req, res) => {
    const { username, password } = req.body;

    // check if our db has teacher with that username
    const teacher = await TeacherUser.findOne({ username }).exec();
    if (!teacher) throw new ExpressError("No teacher found", 400);

    // compare password
    const match = await comparePassword(password, teacher.password);
    if (!match) throw new ExpressError("Wrong Password", 400);

    // create signed JWT
    const token = jwt.sign({ _id: teacher._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // return teacher and token to client, exclude hashed password
    teacher.password = undefined;

    // send token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" && true,
        sameSite: process.env.NODE_ENV === "production" && "none",
    });

    // send teacher as json response
    return res.json(teacher);
};

export const teacherLogout = async (req, res) => {
    res.clearCookie("token", {
        secure: process.env.NODE_ENV === "production" && true,
        sameSite: process.env.NODE_ENV === "production" && "none",
    });
    return res.json({ message: "signout success" });
};

export const iscurrentTeacher = async (req, res) => {
    const teacher = await TeacherUser.findById(req.user._id).exex();

    if (!teacher) {
        throw new ExpressError("Only Teachers can access this route", 400);
    }

    return res.json({ ok: true });
};
