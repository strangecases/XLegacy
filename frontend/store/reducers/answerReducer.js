import * as types from "../types";

const initialState = {};

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_ANSWERS:
            console.log(action.payload);
            return { ...state, ...action.payload };
        // case types.FETCH_TEST:
        //     return { ...state, [action.payload._id]: action.payload };
        // case types.CREATE_TEST:
        //     return { ...state, [action.payload._id]: action.payload };
        case types.EDIT_ANSWER:
            return {
                ...state,
                [action.payload.questionNo]: action.payload.answer,
            };
        // case types.DELETE_TEST:
        //     return _.omit(state, action.payload);
        case types.EMPTY_ANSWERS:
            return { ...initialState };
        default:
            return state;
    }
};

export default answerReducer;
