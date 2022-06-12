import expressJwt from "express-jwt";
import Test from "../models/test.js";
import School from "../models/school.js";
import ExpressError from "../utils/ExpressError.js";

export const requireSignin = expressJwt({
    getToken: (req, res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

export const arrayLimitForSection = async (req, res, next) => {
    const test = await Test.findById(req.params.testId, "sectionData sections");
    console.log(req.params.id, req.params.testId);
    console.log(test);
    if (test.sectionData.length >= 4 && test.sections.length >= 4) {
        throw new ExpressError("only 4 sections can be added to a test", 400);
    } else {
        next();
    }
};

export const isTestAuthor = async (req, res, next) => {
    const { testId } = req.params;
    console.log(testId);
    const test = await Test.findById(testId);
    if (!test.author.equals(req.user._id) || !test) {
        throw new ExpressError("You do not have permission to do that!", 400);
    } else {
        next();
    }
};

export const isSchoolAdmin = async (req, res, next) => {
    const { id } = req.params;
    const school = await School.findById(id);
    if (!school.admin.equals(req.user._id) || !school) {
        throw new ExpressError("You do not have permission to do that!", 400);
    } else {
        next();
    }
};
