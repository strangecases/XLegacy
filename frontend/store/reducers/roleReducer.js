import * as types from "../types";

const roleReducer = (state = "", action) => {
    switch (action.type) {
        case types.ROLE:
            return action.payload;
        default:
            return state;
    }
};

export default roleReducer;
