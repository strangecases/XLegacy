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

const visibleDeleteSchoolYes = () => {
    return {
        type: types.VISIBLE_DELETE_SCHOOL_YES,
    };
};

const visibleDeleteSchoolNo = () => {
    return {
        type: types.VISIBLE_DELETE_SCHOOL_NO,
    };
};

const modalActions = {
    visibleTestYes,
    visibleTestNo,
    visibleSectionYes,
    visibleSectionNo,
    visibleDeleteTestYes,
    visibleDeleteTestNo,
    visibleDeleteSectionYes,
    visibleDeleteSectionNo,
    visibleDeleteSchoolYes,
    visibleDeleteSchoolNo,
};

export default modalActions;
