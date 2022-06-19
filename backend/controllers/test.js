import Test from "../models/test.js";
import School from "../models/school.js";
import ExpressError from "../utils/ExpressError.js";

export const index = async (req, res) => {
    console.log(req.query);
    const { page, pageSize } = req.query;

    const tests = await Test.find(
        { author: req.user._id, school: req.params.id },
        "-tests"
    )
        .skip(pageSize * page - pageSize)
        .limit(pageSize)
        .sort({ createdAt: -1 });
    const numOfTests = await Test.countDocuments({
        author: req.user._id,
        school: req.params.id,
    });

    if (!tests) throw new ExpressError("schools not found", 400);
    return res.json({ tests, numOfTests });
};

export const createTest = async (req, res) => {
    const test = new Test(req.body);

    const school = await School.findById(req.params.id);
    test.school = school._id;

    const date = new Date();
    const year = date.getFullYear();

    if (!school.tests[req.body.classNo]) {
        school.tests = {
            ...school.tests,
            [req.body.classNo]: { [year]: [test._id] },
        };
    } else if (
        school.tests[req.body.classNo] &&
        !school.tests[req.body.classNo][year]
    ) {
        school.tests[req.body.classNo] = {
            ...school.tests[req.body.classNo],
            [year]: [test._id],
        };
    } else {
        school.tests[req.body.classNo][year].push(test._id);
    }

    // school.tests[req.body.classNo][year].push(test._id);
    school.markModified(`tests.${req.body.classNo}`);
    school.markModified(`tests.${req.body.classNo}.${year}`);

    await school.save();
    await test.save();
    return res.json(test);
};

export const getOneTest = async (req, res) => {
    const test = await Test.findById(req.params.testId)
        .populate({
            path: "author",
            select: "name",
        })
        .populate({
            path: "school",
            select: "schoolName",
        })
        .exec();
    if (!test) throw new ExpressError("No test Found", 400);
    return res.json(test);
};

export const editTest = async (req, res) => {
    console.log(req.body);
    const test = await Test.findByIdAndUpdate(
        req.params.testId,
        { ...req.body },
        {
            upsert: true,
            new: true,
        }
    );
    return res.json({ test });
};

export const deleteTest = async (req, res) => {
    const { id, testId } = req.params;
    const test = await Test.findByIdAndDelete(testId);
    const year = test.createdAt.getFullYear();
    const select = `tests.${test.classNo}.${year}`;
    const selectOther = `tests.otherTests.${year}`;
    await School.findByIdAndUpdate(id, {
        $pull: {
            [select]: test._id,
            [selectOther]: test._id,
        },
    });

    console.log(test);
    res.json({ ok: true });
};
