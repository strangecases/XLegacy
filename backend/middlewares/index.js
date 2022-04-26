import expressJwt from "express-jwt";
import Test from "../models/test.js";
import ExpressError from "../utils/ExpressError.js";

export const requireSignin = expressJwt({
    getToken: (req, res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

export const arrayLimitForSection = async (req, res, next) => {
    const test = await Test.findById(req.params.id, "sectionData sections");
    console.log(test);
    if (test.sectionData.length >= 4 && test.sections.length >= 4) {
        throw new ExpressError("only 4 sections can be added to a test", 400);
    } else {
        next();
    }
};

export const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const test = await Test.findById(id);
    if (!test.author.equals(req.user._id) || !test) {
        throw new ExpressError("You do not have permission to do that!", 400);
    } else {
        next();
    }
};
