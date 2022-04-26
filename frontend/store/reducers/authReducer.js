import * as types from "../types";

const initialState = {
    admin: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, admin: action.payload };
        case types.LOGOUT:
            return { ...state, admin: null };
        default:
            return state;
    }
};

export default authReducer;
