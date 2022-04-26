import Test from "../models/test.js";
import ExpressError from "../utils/ExpressError.js";

export const index = async (req, res) => {
    const tests = await Test.find({ author: req.user._id });
    return res.json(tests);
};

export const createTest = async (req, res) => {
    const test = new Test(req.body);
    await test.save();
    return res.json(test);
};

export const getOneTest = async (req, res) => {
    const test = await Test.findById(req.params.id).exec();
    if (!test) throw new ExpressError("No test Found", 400);
    return res.json(test);
};

export const editTest = async (req, res) => {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
        upsert: true,
        new: true,
    });
    return res.json({ test });
};

export const deleteTest = async (req, res) => {
    const { id } = req.params;
    const test = await Test.findByIdAndDelete(id);
    console.log(test);
    res.json({ ok: true });
};
