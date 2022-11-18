import _ from "lodash";
import * as types from "../types";

const initialState = {
    1: { questionNo: 1 },
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_QUESTIONS:
            return {
                ...state,
                ..._.mapKeys(action.payload, "questionNo"),
            };
        case types.EDIT_QUESTION:
            return {
                ...state,
                [action.payload.questionNo]: action.payload,
            };
        case types.DELETE_QUESTION:
            return _.omit(state, action.payload);
        case types.EMPTY_QUESTIONS:
            return { ...initialState };
        default:
            return state;
    }
};

export default questionReducer;
