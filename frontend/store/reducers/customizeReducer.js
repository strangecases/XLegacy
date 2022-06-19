import * as types from "../types";

const initialState = {
    selectedSectionId: null,
    selectedQuestion: 1,
    selectedSectionNo: 1,
    totalClassTests: 50,
    totalTests: 50,
    selectedClass: "",
    examSaved: false,
    examSuccess: "",
};

const customizeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SELECTED_SECTION_ID:
            return { ...state, selectedSectionId: action.payload };
        case types.SELECTED_QUESTION:
            return { ...state, selectedQuestion: action.payload };
        case types.SELECTED_SECTION_NO:
            return { ...state, selectedSectionNo: action.payload };
        case types.TOTAL_TESTS:
            return { ...state, totalTests: action.payload };
        case types.TOTAL_CLASS_TESTS:
            return { ...state, totalClassTests: action.payload };
        case types.SELECTED_CLASS:
            return { ...state, selectedClass: action.payload };
        case types.EXAM_SAVED:
            return { ...state, examSaved: action.payload };
        case types.EXAM_SUCCESS:
            return { ...state, examSuccess: action.payload };
        default:
            return state;
    }
};

export default customizeReducer;
