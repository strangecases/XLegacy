import * as types from "../types";

const questionsDrawer = (isOpen) => {
    return {
        type: types.QUESTIONS_DRAWER,
        payload: isOpen,
    };
};

const questionsDrawerActions = {
    questionsDrawer,
};

export default questionsDrawerActions;
