import * as yup from "yup";

export const testSchema = yup.object().shape({
    testTitle: yup
        .string()
        .max(50, "title should be max 50 words")
        .required("title is required"),
    testTime: yup
        .number()
        .typeError("test time must be a number")
        .max(100, "tests should not be more than 100 min")
        .required("test time is required"),
    classNo: yup
        .number()
        .typeError("class number must be a number")
        .min(6, "tests start with class 6")
        .max(12, "tests end with class 12")
        .required("class number is required"),
    testCode: yup.string().required("test code is required"),
});

export const sectionSchema = yup.object().shape({
    subject: yup
        .string()
        .max(50, "subject name can be max 50 words")
        .required("subject name is required"),
    sectionNo: yup
        .number()
        .typeError("section number must be a number")
        .max(4, "no more than 4 sections per test")
        .required("section number is required"),
    sectionDescription: yup
        .string()
        .max(100, "Description can be max 100 words")
        .required("desciption is required"),
});

export const loginSchema = yup
    .object()
    .shape({
        email: yup
            .string()
            .email("email format is wrong")
            .required("email is required"),
        password: yup
            .string()
            .min(6, "password should be minimum 6 characters long")
            .max(16)
            .required("password is required"),
    })
    .required();

export const registerSchema = yup
    .object()
    .shape({
        name: yup.string().required("name is required"),
        email: yup
            .string()
            .email("email format is wrong")
            .required("email is required"),
        password: yup
            .string()
            .min(6, "password should be minimum 6 characters long")
            .max(16)
            .required("password is required"),
        adminCode: yup.string().required("Admin code is required"),
    })
    .required();

export const questionSchema = yup.object().shape({
    question: yup
        .string()
        .min(10, "question should be minimum 10 characters long")
        .max(300, "question should be maximum 300 characters long")
        .required("question is required"),
    options: yup.object().shape({
        a: yup
            .string()
            .max(50, "option should be maximum 50 characters long")
            .required("option is required"),
        b: yup
            .string()
            .max(50, "option should be maximum 50 characters long")
            .required("option is required"),
        c: yup
            .string()
            .max(50, "option should be maximum 50 characters long")
            .required("option is required"),
        d: yup
            .string()
            .max(50, "option should be maximum 50 characters long")
            .required("option is required"),
    }),

    answer: yup.string().required("Answer is required"),
});
