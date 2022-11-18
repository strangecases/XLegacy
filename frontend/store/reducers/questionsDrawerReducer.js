import * as types from "../types";

const questionsDeawerReducer = (state = false, action) => {
    switch (action.type) {
        case types.QUESTIONS_DRAWER:
            return action.payload;
        default:
            return state;
    }
};

export default questionsDeawerReducer;
