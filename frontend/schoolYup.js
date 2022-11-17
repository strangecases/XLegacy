/* eslint-disable func-names */
import * as yup from "yup";
// import _ from "lodash";

yup.addMethod(yup.object, "uniqueProperty", function (propertyName, message) {
    return this.test("unique", message, function (value) {
        if (!value || !value[propertyName]) {
            return true;
        }

        // console.log(value);

        if (
            this.parent
                .filter((v) => v !== value)
                .some((v) => v[propertyName] === value[propertyName])
        ) {
            throw this.createError({
                path: `${this.path}.${propertyName}`,
            });
        }

        return true;
    });
});

// yup.addMethod(yup.array, "uniqueProperty", function (propertyPath, message) {
//     return this.test("unique", "", function (list) {
//         const errors = [];

//         list.forEach((item, index) => {
//             const propertyValue = _.get(item, propertyPath);

//             if (
//                 propertyValue &&
//                 _.filter(list, [propertyPath, propertyValue]).length > 1
//             ) {
//                 errors.push(
//                     this.createError({
//                         path: `${this.path}[${index}].${propertyPath}`,
//                         message,
//                     })
//                 );
//             }
//         });

//         if (!_.isEmpty(errors)) {
//             throw new yup.ValidationError(errors);
//         }

//         return true;
//     });
// });

const schoolSchema = yup.object().shape({
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
    classes: yup
        .array()
        .of(
            yup
                .object()
                .shape({
                    classNo: yup
                        .number("class number is required")
                        .typeError("class number must be a number")
                        .required("class number is required"),
                    groups: yup
                        .array()
                        .of(
                            yup
                                .object()
                                .shape({
                                    group: yup.string().required("required"),
                                })
                                .uniqueProperty("group", "duplicate")
                        )
                        .max(10, "Groups exceed limit of 10"),
                    // .uniqueProperty("group", "duplicate"),
                })
                .uniqueProperty("classNo", "This class is already added")
                .required("class number is required")
        )
        .max(16, "Classes exceed limit of 16"),
    // .uniqueProperty("classNo", "This class is already added"),
});

export default schoolSchema;
