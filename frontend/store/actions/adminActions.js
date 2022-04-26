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

const adminActions = {
    logIn,
    logOut,
};

export default adminActions;
