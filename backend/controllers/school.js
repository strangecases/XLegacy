import _ from "lodash";
import School from "../models/school.js";
import Test from "../models/test.js";
import ExpressError from "../utils/ExpressError.js";

export const index = async (req, res) => {
    const schools = await School.find({ admin: req.user._id }, "-tests");

    if (!schools) throw new ExpressError("schools not found", 400);
    return res.json(schools);
};

export const searchSchool = async (req, res) => {
    let school;
    if (req.query && req.query.type === "search") {
        school = await School.findOne({
            schoolCode: req.query.schoolCode,
        });
        // console.log(school);
    }
    return res.json(school);
};

export const createSchool = async (req, res) => {
    const school = await new School(req.body);

    const date = new Date();
    const year = date.getFullYear();

    let x;

    if (req.body.classes) {
        x = req.body.classes.reduce(
            (acc, cur) => ({
                ...acc,
                [cur.classNo]: { [year]: [] },
            }),
            {}
        );
    }

    const y = { ...x, otherTests: { [year]: [] } };
    // console.log(y);

    school.tests = y;

    if (!school)
        throw new ExpressError("Something went wrong, try again later", 400);

    await school.save();
    return res.json(school);
};

export const showSchool = async (req, res) => {
    let school;
    let noOfClassTests = 4;
    // console.log(req.query);
    const { year, classNo, page, pageSize } = req.query;

    if (!year || !classNo) {
        // console.log(classNo);
        school = await School.findById(req.params.id);
    } else if (page && year && classNo) {
        // console.log("wwww");
        school = await School.findById(req.params.id)
            .populate(
                {
                    path: `tests.${classNo}.${year}`,
                    select: "testTitle classNo testTime isPublished",
                    limit: pageSize,
                    skip: (page - 1) * pageSize,
                    options: { sort: { createdAt: -1 } },
                    model: "Test",
                }
                // `tests.${classNo}.${year}`,
                // "testTitle classNo testTime",
                // "Test"
            )
            .exec();

        noOfClassTests = await School.findById(req.params.id, `tests`);
        noOfClassTests = noOfClassTests.tests[classNo][year].length;
    }

    if (!school)
        throw new ExpressError("School not found, try again later", 400);
    // console.log(school);
    return res.json({ school, noOfClassTests });
};

export const editSchool = async (req, res) => {
    if (
        req.body.classNo &&
        req.body.classNo === "otherTests" &&
        req.body.type === "edit"
    ) {
        const { classNo, testId } = req.body;
        // console.log(req.body);
        const school = await School.findById(req.params.id);
        const test = await Test.findById(testId);
        const year = test.createdAt.getFullYear();

        if (test.school.equals(req.params.id)) {
            throw new ExpressError(
                `This test is created here before look around class-${test.classNo}`,
                400
            );
        }

        if (!school || !test) {
            throw new ExpressError(
                "Something went wrong, try again later",
                400
            );
        } else if (
            school.tests[classNo][year].some((el) => el.equals(test._id))
        ) {
            throw new ExpressError("This test is added previously", 400);
        }

        if (school.otherTestsClassMsg) {
            school.otherTestsClassMsg = "";
        }

        const isClass = school.classes.find((cls) => {
            return parseInt(cls.classNo, 10) === test.classNo;
        });

        if (isClass === undefined) {
            school.classes.push({ classNo: test.classNo, groups: [] });
            school.otherTestsClassMsg = `Class-${test.classNo} is added automatically to ${school.schoolName} school, if you dont want to add class-${test.classNo} you can delete it.`;
        }

        if (school.tests[classNo] && !school.tests[classNo][year]) {
            school.tests[classNo] = {
                ...school.tests[classNo],
                [year]: [test._id],
            };
        } else {
            school.tests[classNo][year].push(test._id);
        }

        school.markModified(`tests.${classNo}.${year}`);
        await school.save();

        return res.json(school);
    } else if (
        req.body.classNo &&
        req.body.classNo === "otherTests" &&
        req.body.type === "delete"
    ) {
        const test = await Test.findById(req.body.testId);
        const year = test.createdAt.getFullYear();

        const select = `tests.${req.body.classNo}.${year}`;
        const school = await School.findByIdAndUpdate(req.params.id, {
            $pull: {
                [select]: test._id,
            },
        });
        return res.json(school);
    } else if (req.body.type === "otherTestsClassMsg") {
        const school = await School.findById(req.params.id);
        if (school.otherTestsClassMsg) {
            school.otherTestsClassMsg = "";
        }
        await school.save();
        return res.json(school);
    }
    // console.log("not reached");

    if (req.body.classes.length > 16) {
        throw new ExpressError("Classes exceed limit of 16");
    }

    req.body.classes.forEach((cls) => {
        if (cls.groups && cls.groups.length > 10) {
            throw new ExpressError("Groups exceed limit of 10");
        }
    });

    const seen = new Set();
    const hasDuplicates = req.body.classes.some((currentObject) => {
        return seen.size === seen.add(currentObject.classNo).size;
    });

    if (hasDuplicates) {
        throw new ExpressError(
            "You added duplicate classes, please check",
            400
        );
    }

    const schoolPrev = await School.findById(req.params.id);
    if (!schoolPrev)
        throw new ExpressError("Something went wrong, try again later", 400);

    if (schoolPrev.otherTestsClassMsg) {
        schoolPrev.otherTestsClassMsg = "";
    }

    schoolPrev.classes.forEach((prevCls) => {
        const val = req.body.classes.find((cls) => {
            return parseInt(prevCls.classNo, 10) === cls.classNo;
        });
        // console.log(val);
        // console.log(req.body.classes);
        // console.log(schoolPrev.classes);
        if (val === undefined && schoolPrev.tests[prevCls.classNo]) {
            const years = Object.keys(schoolPrev.tests[prevCls.classNo]);
            years.forEach((year) => {
                // console.log(year);
                // console.log(schoolPrev.tests[prevCls.classNo][year]);
                schoolPrev.tests[prevCls.classNo][year].forEach(
                    async (test) => {
                        // console.log(test);
                        await Test.findByIdAndDelete(test);
                    }
                );
            });
            // console.log(schoolPrev.tests);
            schoolPrev.tests = _.omit(schoolPrev.tests, prevCls.classNo);
            // console.log(schoolPrev.tests);
        }
    });

    await schoolPrev.save();

    const school = await School.findByIdAndUpdate(req.params.id, req.body, {
        upsert: true,
        new: true,
    });

    if (!school)
        throw new ExpressError("Something went wrong, try again later", 400);

    return res.json(school);
};

export const deleteSchool = async (req, res) => {
    const school = await School.findByIdAndDelete(req.params.id);

    if (!school)
        throw new ExpressError("Something went wrong, try again later", 400);

    res.json({ ok: true });
};
