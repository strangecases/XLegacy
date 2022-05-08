import * as types from "../types";

const fetchAnwers = (data) => {
    return {
        type: types.FETCH_ANSWERS,
        payload: data,
    };
};

const editAnswer = (data) => {
    return {
        type: types.EDIT_ANSWER,
        payload: data,
    };
};

const answerActions = {
    fetchAnwers,
    editAnswer,
};

export default answerActions;
