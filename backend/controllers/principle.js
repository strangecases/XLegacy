import jwt from "jsonwebtoken";
import PrincipleUser from "../models/principle.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
import ExpressError from "../utils/ExpressError.js";

export const principleRegister = async (req, res) => {
    const { username, age, phoneNo, password } = req.body;

    // validation
    // if (!username) throw new ExpressError("Name is required", 400);

    if (!password || password.length < 6) {
        throw new ExpressError(
            "Password is required and should be minimum 6 charechters long",
            400
        );
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // register principle
    const principle = await new PrincipleUser({
        username,
        age,
        phoneNo,
        password: hashedPassword,
        role: "Principle",
    });

    await principle.save();

    return res.json({ ok: true });
};

export const principleLogin = async (req, res) => {
    const { username, password } = req.body;

    // check if our db has principle with that username
    const principle = await PrincipleUser.findOne({ username }).exec();
    if (!principle) throw new ExpressError("No principle found", 400);

    // compare password
    const match = await comparePassword(password, principle.password);
    if (!match) throw new ExpressError("Wrong Password", 400);

    // create signed JWT
    const token = jwt.sign({ _id: principle._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // return principle and token to client, exclude hashed password
    principle.password = undefined;

    // send token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" && true,
        sameSite: process.env.NODE_ENV === "production" && "none",
    });

    // send principle as json response
    return res.json(principle);
};

export const principleLogout = async (req, res) => {
    res.clearCookie("token", {
        secure: process.env.NODE_ENV === "production" && true,
        sameSite: process.env.NODE_ENV === "production" && "none",
    });
    return res.json({ message: "signout success" });
};

export const iscurrentPrinciple = async (req, res) => {
    const principle = await PrincipleUser.findById(req.user._id).exec();

    if (!principle) {
        throw new ExpressError("Only Principle can access this route", 400);
    }

    return res.json({ ok: true });
};
