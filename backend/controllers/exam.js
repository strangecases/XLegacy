import Exam from "../models/exam.js";
import Section from "../models/section.js";
import School from "../models/school.js";
import Test from "../models/test.js";
import ExpressError from "../utils/ExpressError.js";

export const index = async (req, res) => {
    const { id, testId } = req.params;
    let exams;
    if (req.query.classNo && req.query.group) {
        exams = await Exam.find(
            {
                schoolId: id,
                testId,
                classNo: req.query.classNo,
                classGroup: req.query.group,
            },
            "-schoolId -testId"
        ).sort({ marks: -1 });
    } else {
        exams = await Exam.find(
            { $and: [{ schoolId: id }, { testId }] },
            "-schoolId -testId"
        ).sort({ marks: -1 });
    }

    // console.log(exams);
    res.json(exams);
};

export const createExam = async (req, res) => {
    const school = await School.findById(req.params.id);
    if (school.schoolCode !== req.body.schoolCode) {
        console.log("School code is not correct");
        throw new ExpressError("School code is not correct", 400);
    }
    const test = await Test.findById(req.params.testId);
    if (test.testCode !== req.body.testCode) {
        throw new ExpressError("Test code is not correct", 400);
    }

    const exam = await new Exam(req.body);
    exam.schoolId = req.params.id;
    exam.testId = req.params.testId;
    await exam.save();
    console.log(exam);
    if (!exam) throw new ExpressError("Exam not saved, try again", 400);
    res.json(exam);
};

export const showExam = async (req, res) => {
    console.log(req.body);
    const exam = await Exam.findById(req.params.examId);
    res.json(exam);
};

export const editExam = async (req, res) => {
    // console.log(req.body);
    // const exam = await Exam.findByIdAndUpdate(req.params.examId, req.body, {
    //     upsert: true,
    //     new: true,
    // });
    const { selectedSectionId, selectedSectionNo, answers } = req.body;
    console.log(req.body);
    const exam = await Exam.findById(req.params.examId);
    const questionAnswers = await Section.findById(
        selectedSectionId,
        "questions -_id"
    );

    const object = questionAnswers.questions.reduce(
        // eslint-disable-next-line no-return-assign
        (obj, item) => ((obj[item.questionNo] = item.answer), obj),
        {}
    );
    console.log(Object.values(object).length);
    console.log(object);

    let y = 0;
    if (exam.answers && exam.answers[selectedSectionNo]) {
        y = exam.answers[selectedSectionNo].sectionMarks;
        console.log("hi", y);
    }

    let score = 0;
    const outOf = Object.values(object).length;
    for (let i = 1; i <= Object.values(object).length; i += 1) {
        if (
            object[i] !== undefined &&
            answers[i] !== undefined &&
            object[i] === answers[i]
        ) {
            score += 1;
        }
    }

    if (!exam.answers) {
        exam.answers = {
            [selectedSectionNo]: {
                ...answers,
                sectionMarks: score,
                sectionOutOf: outOf,
            },
        };
        exam.marks = score;
        console.log("first");
    } else {
        console.log(y);
        exam.answers[selectedSectionNo] = {
            ...answers,
            sectionMarks: score,
            sectionOutOf: outOf,
        };
        exam.marks -= y;
        exam.marks += score;
    }

    exam.markModified(`answers.${selectedSectionNo}`);
    await exam.save();
    console.log(exam.answers);
    console.log(exam.marks);
    res.json(exam);

    // exam.answers = { 1: { 1: "a" } };
    // await exam.save();
    // console.log(exam.answers);
    // res.json(exam);
};
