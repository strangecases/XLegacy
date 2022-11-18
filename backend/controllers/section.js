import Section from "../models/section.js";
import Test from "../models/test.js";
import ExpressError from "../utils/ExpressError.js";

export const index = (req, res) => {
    res.send("Hiiii");
};

export const createSection = async (req, res) => {
    const section = await new Section(req.body);
    const test = await Test.findByIdAndUpdate(
        req.params.testId,
        {
            $push: {
                // sectionData: { ...req.body, sectionId: section._id },
                sections: section,
            },
        },
        {
            upsert: true,
            new: true,
        }
    );
    // console.log("create section", test);
    await section.save();
    return res.json({ test });
};

export const showSection = async (req, res) => {
    const section = await Section.findById(
        req.params.sectionId,
        "questions isEmpty isFull -_id"
    );
    if (!section) throw new ExpressError("No section Found", 400);
    res.json(section);
};

export const editSection = async (req, res) => {
    // console.log(req.body);

    if (req.body.questions) {
        let isEmpty = true;
        let isFull = false;

        if (req.body.questions.length === 25) {
            isFull = true;
        }

        if (req.body.questions[0].question && req.body.questions[0].answer) {
            isEmpty = false;
        }

        if (req.body.isPublished) {
            await Test.findByIdAndUpdate(
                req.params.testId,
                { isPublished: req.body.isPublished },
                {
                    upsert: true,
                    new: true,
                }
            );
        }

        await Section.findByIdAndUpdate(
            req.params.sectionId,
            { questions: req.body.questions, isFull, isEmpty },
            {
                upsert: true,
                new: true,
            }
        );
        // await Test.findOneAndUpdate(
        //     {
        //         _id: req.params.testId,
        //     },
        //     {
        //         $set: {
        //             "sectionData.$[el].isEmpty": isEmpty,
        //             "sectionData.$[el].isFull": isFull,
        //         },
        //     },
        //     {
        //         arrayFilters: [{ "el.sectionId": req.params.sectionId }],
        //         upsert: true,
        //         new: true,
        //     }
        // );
        res.json({ ok: true });
    } else if (
        req.body.subject ||
        req.body.sectionNo ||
        req.body.sectionDescription
    ) {
        // console.log(req.body);
        await Section.findByIdAndUpdate(req.params.sectionId, req.body, {
            upsert: true,
            new: true,
        });
        // await Test.findOneAndUpdate(
        //     {
        //         _id: req.params.testId,
        //     },
        //     {
        //         $set: {
        //             "sectionData.$[el].subject": req.body.subject,
        //             "sectionData.$[el].sectionNo": req.body.sectionNo,
        //             "sectionData.$[el].sectionDescription":
        //                 req.body.sectionDescription,
        //             "sectionData.$[el].sectionId": req.params.sectionId,
        //         },
        //     },
        //     {
        //         arrayFilters: [{ "el.sectionId": req.params.sectionId }],
        //         upsert: true,
        //         new: true,
        //     }
        // );
        res.json({ ok: true });
    }
};

export const deleteSection = async (req, res) => {
    await Test.findByIdAndUpdate(
        req.params.testId,
        {
            $pull: {
                sections: req.params.sectionId,
                // sectionData: { sectionId: req.params.sectionId },
            },
        },
        {
            upsert: true,
            new: true,
        }
    );
    const section = await Section.findByIdAndDelete(req.params.sectionId);
    res.json(section);
};
