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

const emptyAnswers = () => {
    return {
        type: types.EMPTY_ANSWERS,
    };
};

const answerActions = {
    fetchAnwers,
    editAnswer,
    emptyAnswers,
};

export default answerActions;
