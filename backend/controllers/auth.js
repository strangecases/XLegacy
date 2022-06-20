import jwt from "jsonwebtoken";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import Admin from "../models/admin.js";
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
    const { name, email, password, adminCode } = req.body;

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

    console.log(adminCode, process.env.ADMIN_SECRET);

    if (adminCode !== process.env.ADMIN_SECRET) {
        throw new ExpressError("admin code is wrong", 400);
    }

    const adminExist = await Admin.findOne({ email }).exec();
    if (adminExist) {
        // return res.status(400).send("Email is taken");
        throw new ExpressError("Email is taken", 400);
    }
    // hash the password

    const hashedPassword = await hashPassword(password);

    // register

    const admin = new Admin({
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
    });
    await admin.save();

    return res.json({ ok: true });
};

export const editAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.registerId);
    admin.name = req.body.name;
    admin.email = req.body.email;
    if (
        req.body.password?.length >= 6 &&
        req.body.newPassword === req.body.confirmPassword
    ) {
        console.log("enered");
        const match = await comparePassword(req.body.password, admin.password);

        if (!match)
            throw new ExpressError(
                "Current Password does not match the password stored.",
                400
            );

        const newHasedPassword = await hashPassword(req.body.newPassword);
        admin.password = newHasedPassword;
    }
    // } else {
    //     throw new ExpressError(
    //         "Please check change password section some thing went wrong",
    //         400
    //     );
    // }
    await admin.save();
    admin.password = undefined;
    res.json(admin);
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // check if our db has admin with that email
    const admin = await Admin.findOne({ email }).exec();
    // if (!admin) return res.status(400).send("No admin found");
    if (!admin) throw new ExpressError("No admin found", 400);

    // compare password
    const match = await comparePassword(password, admin.password);
    // if (!match) return res.status(400).send("Wrong Password");
    if (!match) throw new ExpressError("Wrong Password", 400);

    // create signed JWT
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // return admin and token to client, exclude hashed password
    admin.password = undefined;

    // send token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true, // only works on https
        sameSite: "lax",
    });

    // send admin as json response
    return res.json(admin);
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    return res.json({ message: "signout success" });
};

export const currentAdmin = async (req, res) => {
    const admin = await Admin.findById(req.user._id).select("-password").exec();

    if (!admin.isAdmin) {
        throw new ExpressError("Only admin can access this route", 400);
    }

    return res.json({ ok: true });
};

export const adminIsAuthor = async (req, res) => {
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
    const admin = await Admin.findOneAndUpdate(
        { email },
        { passwordResetCode: shortCode }
    );
    if (!admin) throw new ExpressError("No admin found", 400);

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
    const admin = await Admin.findOneAndUpdate(
        { email, passwordResetCode: code },
        { password: hashedPassword, passwordResetCode: "" }
    );
    if (!admin) throw new ExpressError("Wrong admin or code!", 400);

    return res.json({ ok: true });
};
