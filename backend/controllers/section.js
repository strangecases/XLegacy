import Section from "../models/section.js";
import Test from "../models/test.js";
import ExpressError from "../utils/ExpressError.js";

export const index = (req, res) => {
    res.send("Hiiii");
};

export const createTest = async (req, res) => {
    const section = await new Section(req.body);
    const test = await Test.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                sectionData: { ...req.body, sectionId: section._id },
                sections: section,
            },
        },
        {
            upsert: true,
            new: true,
        }
    );
    await section.save();
    return res.json({ test });
};

export const showSection = async (req, res) => {
    const section = await Section.findById(
        req.params.sectionId,
        "questions -_id"
    );
    console.log(section);
    if (!section) throw new ExpressError("No section Found", 400);
    res.json(section);
};

export const editSection = async (req, res) => {
    const section = await Section.findByIdAndUpdate(
        req.params.sectionId,
        req.body,
        {
            upsert: true,
            new: true,
        }
    );
    let test;
    if (req.body.subject || req.body.sectionNo || req.body.sectionDescription) {
        test = await Test.findByIdAndUpdate(req.params.id, req.body, {
            upsert: true,
            new: true,
        });
    }

    console.log(section, test);
    res.json({ ok: true });
};
