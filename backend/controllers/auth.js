import jwt from "jsonwebtoken";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
import ExpressError from "../utils/ExpressError.js";

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // validation

    // if (!name) return res.status(400).send("Name is required");

    // if (!password || password.length < 6) {
    //     return res
    //         .status(400)
    //         .send(
    //             "Password is required and should be minimum 6 charechters long"
    //         );
    // }

    if (!name) throw new ExpressError("Name is required", 400);

    if (!password || password.length < 6) {
        throw new ExpressError(
            "Password is required and should be minimum 6 charechters long",
            400
        );
    }

    const userExist = await User.findOne({ email }).exec();
    if (userExist) {
        // return res.status(400).send("Email is taken");
        throw new ExpressError("Email is taken", 400);
    }
    // hash the password

    const hashedPassword = await hashPassword(password);

    // register

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.json({ ok: true });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    // if (!user) return res.status(400).send("No user found");
    if (!user) throw new ExpressError("No user found", 400);

    // compare password
    const match = await comparePassword(password, user.password);
    // if (!match) return res.status(400).send("Wrong Password");
    if (!match) throw new ExpressError("Wrong Password", 400);

    // create signed JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // return user and token to client, exclude hashed password
    user.password = undefined;

    // send token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        // secure: true, // only works on https
    });

    // send user as json response
    return res.json(user);
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    return res.json({ message: "signout success" });
};

export const currentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password").exec();
    console.log("current user", user);
    return res.json({ ok: true });
};

// export const sendTestEmail = async (req, res) => {
//     const params = {
//         Source: process.env.EMAIL_FROM,
//         Destination: {
//             ToAddresses: ["sumanthbv8@gmail.com"],
//         },
//         ReplyToAddresses: [process.env.EMAIL_FROM],
//         Message: {
//             Body: {
//                 Html: {
//                     Charset: "UTF-8",
//                     Data: `
//                         <html>
//                             <h1>Reset password link</h1>
//                             <p>Please use the following link to reset your password</p>
//                         </html>
//                     `,
//                 },
//             },
//             Subject: {
//                 Charset: "UTF-8",
//                 Data: "Password reset link",
//             },
//         },
//     };

//     try {
//         const emailSent = await SES.sendEmail(params).promise();
//         console.log(emailSent);
//         res.json({ ok: true });
//     } catch (err) {
//         console.log(err);
//     }
//     // const emailSent = SES.sendEmail(params).promise();
//     // emailSent
//     //     .then((data) => {
//     //         console.log(data);
//     //         res.json({ ok: true });
//     //     })
//     //     .catch((err) => {
//     //         console.log(err);
//     //     });
// };

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    // creating short code for password reset
    const shortCode = nanoid(6).toUpperCase();
    const user = await User.findOneAndUpdate(
        { email },
        { passwordResetCode: shortCode }
    );
    if (!user) throw new ExpressError("No user found", 400);

    // prepare params for email
    const params = {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email],
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                                <html>
                                    <h1>Reset password</h1>
                                    <p>Use this code to reset your password</p>
                                    <h2 style="color:red;">${shortCode}</h2>
                                    <i>scholarX.com</i>
                                </html>
                            `,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Reset password",
            },
        },
    };

    const emailSent = await SES.sendEmail(params).promise();
    console.log(emailSent);
    return res.json({ ok: true });
};

export const resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;

    // hasing password
    const hashedPassword = await hashPassword(newPassword);
    console.log(hashedPassword);

    // checking secret code and updating hashed password
    const user = await User.findOneAndUpdate(
        { email, passwordResetCode: code },
        { password: hashedPassword, passwordResetCode: "" }
    );
    if (!user) throw new ExpressError("Wrong user or code!", 400);

    return res.json({ ok: true });
};
