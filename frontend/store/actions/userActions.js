import * as types from "../types";

const logIn = (user) => {
    return {
        type: types.LOGIN,
        payload: user,
    };
};

const logOut = () => {
    return {
        type: types.LOGOUT,
    };
};

const userActions = {
    logIn,
    logOut,
};

export default userActions;
