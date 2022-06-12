import * as types from "../types";

const logIn = (admin) => {
    return {
        type: types.LOGIN,
        payload: admin,
    };
};

const logOut = () => {
    return {
        type: types.LOGOUT,
    };
};

const editAdmin = (admin) => {
    return {
        type: types.LOGIN,
        payload: admin,
    };
};

const adminActions = {
    logIn,
    logOut,
    editAdmin,
};

export default adminActions;
