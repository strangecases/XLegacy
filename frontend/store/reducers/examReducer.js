import * as types from "../types";

const initialState = {
    examData: undefined,
    examId: undefined,
    examsList: [],
    donutExams: [],
    outOf: 0,
    examResult: {},
};

const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_EXAM:
            return {
                ...state,
                examData: action.payload,
                examId: action.payload._id,
            };
        case types.EXAM_RESULT:
            return {
                ...state,
                examResult: action.payload,
            };
        case types.DELETE_EXAM:
            return { ...initialState };
        case types.EXAMS_LIST:
            return { ...state, examsList: action.payload };
        case types.DONUT_EXAMS:
            return {
                ...state,
                donutExams: action.payload.da,
                outOf: action.payload.total,
            };
        case types.EMPTY_EXAM:
            return { ...initialState };
        default:
            return state;
    }
};

export default examReducer;
