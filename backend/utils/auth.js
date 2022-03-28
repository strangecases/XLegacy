import bcrypt from "bcrypt";

// export const hashPassword = (password) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.genSalt(12, (err1, salt) => {
//             if (err1) {
//                 reject(err1);
//             }
//             bcrypt.hash(password, salt, (err2, hash) => {
//                 if (err2) {
//                     reject(err2);
//                 }
//                 resolve(hash);
//             });
//         });
//     });
// };

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export const comparePassword = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
};
