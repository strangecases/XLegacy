import Exam from "../models/exam.js";
import Section from "../models/section.js";
import ExpressError from "../utils/ExpressError.js";

export const index = async (req, res) => {
    res.send("hii");
};

export const createExam = async (req, res) => {
    // console.log(req.body);
    // res.json({ _id: "hi" });
    const exam = new Exam(req.body);
    await exam.save();
    if (!exam) throw new ExpressError("Exam not saved, try again", 400);
    res.json(exam);
};

export const showExam = async (req, res) => {
    console.log(req.body);
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

    let marks = 0;
    for (let i = 1; i <= Object.values(object).length; i += 1) {
        if (
            object[i] !== undefined &&
            answers[i] !== undefined &&
            object[i] === answers[i]
        ) {
            marks += 1;
        }
    }

    if (!exam.answers) {
        exam.answers = {
            [selectedSectionNo]: { ...answers, sectionMarks: marks },
        };
        console.log("first");
    } else {
        console.log(y);
        exam.answers[selectedSectionNo] = { ...answers, sectionMarks: marks };
        exam.marks -= y;
        exam.marks += marks;
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
