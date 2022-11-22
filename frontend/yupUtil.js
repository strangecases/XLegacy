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
        .min(1, "tests start with class 1")
        .max(12, "tests end with class 12")
        .required("class number is required"),
    testCode: yup.string().required("test code is required"),
});

export const sectionSchema = yup.object().shape({
    subject: yup
        .string()
        .max(32, "subject name can be max 32 words")
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
        name: yup.string().max(32).required("name is required"),
        email: yup
            .string()
            .email("email format is wrong")
            .required("email is required"),
        password: yup
            .string()
            .min(6, "password should be minimum 6 characters")
            .max(32)
            .required("password is required"),
        adminCode: yup.string().required("Admin code is required"),
    })
    .required();

export const questionSchema = yup.object().shape({
    question: yup
        .string()
        .min(10, "question is minimum 10 characters")
        .max(100, "question is maximum 100 characters")
        .required("question is required"),
    options: yup.object().shape({
        a: yup
            .string()
            .max(32, "option maximum 32 characters")
            .required("option is required"),
        b: yup
            .string()
            .max(32, "option maximum 32 characters")
            .required("option is required"),
        c: yup
            .string()
            .max(32, "option maximum 32 characters")
            .required("option is required"),
        d: yup
            .string()
            .max(32, "option maximum 32 characters")
            .required("option is required"),
    }),

    answer: yup.string().required("Answer is required"),
});

export const examSchema = yup
    .object()
    .shape({
        studentName: yup
            .string()
            .max(32, "name atmost 32 characters")
            .required("name is required"),
        schoolCode: yup
            .string()
            // .max(10, "code atmost 10 characters")
            .required("school code is required"),
        testCode: yup
            .string()
            // .max(10, "code atmost 10 characters")
            .required("test code is required"),
        parentsPhNo: yup
            .string()
            .matches(/^$|^\d{10}$/, "not a valid phone no"),
        classNo: yup.number(),
        classGroup: yup.string(),
    })
    .required();

export const schoolSchema = yup.object().shape({
    schoolName: yup
        .string()
        .max(150, "school name should be maximum 150 characters long")
        .required("school name is required"),
    schoolCode: yup
        .string()
        .max(10, "school code should be maximum 10 characters long")
        .required("school code is required"),
    schoolPhNo: yup.string().matches(/^$|^\d{10}$/, "not a valid phone no"),
    schoolAddress: yup.string(),
    classes: yup.array().of(
        yup
            .object()
            .shape({
                classNo: yup
                    .number("class number is required")
                    .typeError("class number must be a number")
                    .required("class number is required"),
                groups: yup.array().of(
                    yup.object().shape({
                        group: yup.string().required("required"),
                    })
                ),
            })
            .required("class number is required")
    ),
});

export const addOtherTestSchema = yup.object().shape({
    link: yup
        .string()
        .matches(
            /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/schools\/[.\w]*\/exams\/[.\w]*\/info)*$/,
            "Enter a valid url"
        )
        .required("Link is required"),
});

export const adminDetailsEditSchema = yup.object().shape({
    email: yup
        .string()
        .email("email format is wrong")
        .required("email is required"),
    name: yup.string().required("name is required"),
    password: yup.string(),
    newPassword: yup.string().when("password", {
        is: (password = "") => password.length >= 6,
        then: yup
            .string()
            .min(6, "password should be minimum 6 characters long")
            .required("password required"),
        otherwise: yup.string(),
    }),
    confirmPassword: yup
        .string()
        .when("password", {
            is: (password = "") => password.length >= 6,
            then: yup
                .string()
                .min(6, "password should be minimum 6 characters long")
                .required("password required"),
            otherwise: yup.string(),
        })
        .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const resetPasswordSchema = yup
    .object()
    .shape({
        email: yup
            .string()
            .email("email format is wrong")
            .required("email is required"),
        code: yup.string().required("Six digit code sent to your mail"),
        newPassword: yup
            .string()
            .min(6, "password should be minimum 6 characters long")
            .max(16)
            .required("password is required"),
    })
    .required();

export const forgotPasswordSchema = yup
    .object()
    .shape({
        email: yup
            .string()
            .email("email format is wrong")
            .required("email is required"),
    })
    .required();
