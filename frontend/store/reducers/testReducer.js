import _ from "lodash";
import * as types from "../types";

const testReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_TESTS:
            return { ...state, ..._.mapKeys(action.payload, "_id") };
        case types.FETCH_TEST:
            return { ...state, [action.payload._id]: action.payload };
        case types.CREATE_TEST:
            return { ...state, [action.payload._id]: action.payload };
        case types.EDIT_TEST:
            return { ...state, [action.payload._id]: action.payload };
        case types.DELETE_TEST:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};

export default testReducer;
