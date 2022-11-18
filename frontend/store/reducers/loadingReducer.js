import * as types from "../types";

const initialState = {
    questionsLoading: false,
    examSavedLoading: false,
    loginLoading: false,
    registerLoading: false,
    schoolSubmitLoading: false,
    questionSaveLoading: false,
    examInfoLoading: false,
    searchLoading: false,
    otherTestsLoading: false,
    modalOkLoading: false,
    deleteLoading: false,
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.QUESTIONS_LOADING:
            return { ...state, questionsLoading: action.payload };
        case types.EXAM_SAVED_LOADING:
            return { ...state, examSavedLoading: action.payload };
        case types.LOGIN_LOADING:
            return { ...state, loginLoading: action.payload };
        case types.REGISTER_LOADING:
            return { ...state, registerLoading: action.payload };
        case types.SCHOOL_SUBMIT_LOADING:
            return { ...state, schoolSubmitLoading: action.payload };
        case types.QUESTION_SAVE_LOADING:
            return { ...state, questionSaveLoading: action.payload };
        case types.EXAM_INFO_LOADING:
            return { ...state, examInfoLoading: action.payload };
        case types.SEARCH_LOADING:
            return { ...state, searchLoading: action.payload };
        case types.OTHER_TESTS_LOADING:
            return { ...state, otherTestsLoading: action.payload };
        case types.MODAL_OK_LOADING:
            return { ...state, modalOkLoading: action.payload };
        case types.DELETE_LOADING:
            return { ...state, deleteLoading: action.payload };
        default:
            return state;
    }
};

export default loadingReducer;
