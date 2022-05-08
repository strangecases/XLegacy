import * as types from "../types";

const visibleTestYes = () => {
    return {
        type: types.VISIBLE_TEST_YES,
    };
};

const visibleTestNo = () => {
    return {
        type: types.VISIBLE_TEST_NO,
    };
};

const visibleSectionYes = () => {
    return {
        type: types.VISIBLE_SECTION_YES,
    };
};

const visibleSectionNo = () => {
    return {
        type: types.VISIBLE_SECTION_NO,
    };
};

const visibleDeleteTestYes = () => {
    return {
        type: types.VISIBLE_DELETE_TEST_YES,
    };
};

const visibleDeleteTestNo = () => {
    return {
        type: types.VISIBLE_DELETE_TEST_NO,
    };
};

const visibleDeleteSectionYes = () => {
    return {
        type: types.VISIBLE_DELETE_SECTION_YES,
    };
};

const visibleDeleteSectionNo = () => {
    return {
        type: types.VISIBLE_DELETE_SECTION_NO,
    };
};

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

const examId = (id) => {
    return {
        type: types.EXAM_ID,
        payload: id,
    };
};

const customActions = {
    visibleTestYes,
    visibleTestNo,
    visibleSectionYes,
    visibleSectionNo,
    visibleDeleteTestYes,
    visibleDeleteTestNo,
    visibleDeleteSectionYes,
    visibleDeleteSectionNo,
    selectedSectionId,
    selectedQuestion,
    selectedSectionNo,
    examId,
};

export default customActions;
