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

const selectedSectionName = (sectionName) => {
    return {
        type: types.SELECTED_SECTION_NAME,
        payload: sectionName,
    };
};

const totalTests = (total) => {
    return {
        type: types.TOTAL_TESTS,
        payload: total,
    };
};

const totalClassTests = (total) => {
    return {
        type: types.TOTAL_CLASS_TESTS,
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

const siderCollapse = (isCollapse) => {
    return {
        type: types.SIDER_COLLAPSE,
        payload: isCollapse,
    };
};

const isQuestionsEmpty = (isEmpty) => {
    return {
        type: types.IS_QUESTIONS_EMPTY,
        payload: isEmpty,
    };
};

const isQuestionsFull = (isFull) => {
    return {
        type: types.IS_QUESTIONS_FULL,
        payload: isFull,
    };
};

const customActions = {
    selectedSectionId,
    selectedQuestion,
    selectedSectionNo,
    selectedSectionName,
    totalTests,
    totalClassTests,
    selectedClass,
    examSaved,
    examSuccess,
    saveSection,
    siderCollapse,
    isQuestionsEmpty,
    isQuestionsFull,
};

export default customActions;
