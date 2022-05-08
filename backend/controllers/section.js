import Section from "../models/section.js";
import Test from "../models/test.js";
import ExpressError from "../utils/ExpressError.js";

export const index = (req, res) => {
    res.send("Hiiii");
};

export const createSection = async (req, res) => {
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
    console.log("create section", test);
    await section.save();
    return res.json({ test });
};

export const showSection = async (req, res) => {
    const section = await Section.findById(
        req.params.sectionId,
        "questions -_id"
    );
    if (!section) throw new ExpressError("No section Found", 400);
    res.json(section);
};

export const editSection = async (req, res) => {
    console.log(req.body);
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
        test = await Test.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                $set: {
                    "sectionData.$[el].subject": req.body.subject,
                    "sectionData.$[el].sectionNo": req.body.sectionNo,
                    "sectionData.$[el].sectionDescription":
                        req.body.sectionDescription,
                    "sectionData.$[el].sectionId": req.params.sectionId,
                },
            },
            {
                arrayFilters: [{ "el.sectionId": req.params.sectionId }],
                upsert: true,
                new: true,
            }
        );
    }
    res.json({ ok: true });
};

export const deleteSection = async (req, res) => {
    const test = await Test.findByIdAndUpdate(
        req.params.id,
        {
            $pull: {
                sections: req.params.sectionId,
                sectionData: { sectionId: req.params.sectionId },
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
