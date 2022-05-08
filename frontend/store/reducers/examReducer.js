import * as types from "../types";

const initialState = {
    examData: undefined,
    examId: undefined,
};

const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_EXAM:
            return {
                ...state,
                examData: action.payload,
                examId: action.payload._id,
            };
        case types.DELETE_EXAM:
            return { ...state, examData: undefined, examId: undefined };
        default:
            return state;
    }
};

export default examReducer;
