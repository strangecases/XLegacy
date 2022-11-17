import * as types from "../types";

const questionsLoading = (isLoading) => {
    return {
        type: types.QUESTIONS_LOADING,
        payload: isLoading,
    };
};

const examSavedLoading = (isLoading) => {
    return {
        type: types.EXAM_SAVED_LOADING,
        payload: isLoading,
    };
};

const loginLoading = (isLoading) => {
    return {
        type: types.LOGIN_LOADING,
        payload: isLoading,
    };
};

const registerLoading = (isLoading) => {
    return {
        type: types.REGISTER_LOADING,
        payload: isLoading,
    };
};

const schoolSubmitLoading = (isLoading) => {
    return {
        type: types.SCHOOL_SUBMIT_LOADING,
        payload: isLoading,
    };
};

const questionSaveLoading = (isLoading) => {
    return {
        type: types.QUESTION_SAVE_LOADING,
        payload: isLoading,
    };
};

const examInfoLoading = (isLoading) => {
    return {
        type: types.EXAM_INFO_LOADING,
        payload: isLoading,
    };
};

const searchLoading = (isLoading) => {
    return {
        type: types.SEARCH_LOADING,
        payload: isLoading,
    };
};

const otherTestsLoading = (isLoading) => {
    return {
        type: types.OTHER_TESTS_LOADING,
        payload: isLoading,
    };
};

const modalOkLoading = (isLoading) => {
    return {
        type: types.MODAL_OK_LOADING,
        payload: isLoading,
    };
};

const deleteLoading = (isLoading) => {
    return {
        type: types.DELETE_LOADING,
        payload: isLoading,
    };
};

const loadingActions = {
    questionsLoading,
    examSavedLoading,
    loginLoading,
    registerLoading,
    schoolSubmitLoading,
    questionSaveLoading,
    examInfoLoading,
    searchLoading,
    otherTestsLoading,
    modalOkLoading,
    deleteLoading,
};

export default loadingActions;
