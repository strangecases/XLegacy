import _ from "lodash";
import * as types from "../types";

const schoolReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_SCHOOLS:
            return { ...state, ..._.mapKeys(action.payload, "_id") };
        case types.FETCH_SCHOOL:
            return { ...state, [action.payload._id]: action.payload };
        case types.CREATE_SCHOOL:
            return { ...state, [action.payload._id]: action.payload };
        case types.EDIT_SCHOOL:
            return { ...state, [action.payload._id]: action.payload };
        case types.DELETE_SCHOOL:
            return _.omit(state, action.payload);
        case types.EMPTY_SCHOOLS:
            return {};
        default:
            return state;
    }
};

export default schoolReducer;
