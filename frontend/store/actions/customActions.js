import * as types from "../types";

const selectedSectionId = (id) => {
    return {
        type: types.SELECTED_SECTION_ID,
        payload: id,
    };
};

const selectedQuestion = (questionNo) => {
    return {
        type: types.SELECTED_QUESTION,
        payload: questionNo,
    };
};

const selectedSectionNo = (sectionNo) => {
    return {
        type: types.SELECTED_SECTION_NO,
        payload: sectionNo,
    };
};

const totalTests = (total) => {
    return {
        type: types.TOTAL_TESTS,
        payload: total,
    };
};

const selectedClass = (classNo) => {
    return {
        type: types.SELECTED_CLASS,
        payload: classNo,
    };
};

const examSaved = (val) => {
    return {
        type: types.EXAM_SAVED,
        payload: val,
    };
};

const examSuccess = (msg) => {
    return {
        type: types.EXAM_SUCCESS,
        payload: msg,
    };
};

const saveSection = (val) => {
    return {
        type: types.SAVE_SECTION,
        payload: val,
    };
};

const loading = (val) => {
    return {
        type: types.LOADING,
        payload: val,
    };
};

const customActions = {
    selectedSectionId,
    selectedQuestion,
    selectedSectionNo,
    totalTests,
    selectedClass,
    examSaved,
    examSuccess,
    saveSection,
    loading,
};

export default customActions;
