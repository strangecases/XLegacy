import * as types from "../types";

const createExam = (data) => {
    return {
        type: types.CREATE_EXAM,
        payload: data,
    };
};

const deleteExam = () => {
    return {
        type: types.DELETE_EXAM,
    };
};

const examActions = {
    createExam,
    deleteExam,
};

export default examActions;
