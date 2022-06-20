import Router from "next/router";
import { toast } from "react-toastify";
import * as types from "../types";
import customActions from "./customActions";
import questionActions from "./questionActions";
import answerActions from "./answerActions";
import axiosFetch from "../../axiosFetch";

const createExam = (id, testId, formValues) => async (dispatch) => {
    try {
        const response = await axiosFetch.post(
            `/api/schools/${id}/tests/${testId}/exams`,
            formValues
        );
        dispatch({
            type: types.CREATE_EXAM,
            payload: response.data,
        });
        Router.push(`/schools/${id}/exams/${testId}`);
    } catch (err) {
        toast.error(err.response.data, {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const emptyExam = () => {
    return {
        type: types.EMPTY_EXAM,
    };
};

const deleteExam = () => {
    return {
        type: types.DELETE_EXAM,
    };
};

const donutExams = (donutData, total) => {
    return {
        type: types.DONUT_EXAMS,
        payload: { da: donutData, total },
    };
};

const outOf = (number) => {
    return {
        type: types.OUTOF,
        payload: number,
    };
};

const examResult = (id, testId, examId) => async (dispatch) => {
    try {
        const exam = await axiosFetch.get(
            `/api/schools/${id}/tests/${testId}/exams/${examId}`
        );
        dispatch({ type: "EXAM_RESULT", payload: exam.data });
    } catch (err) {
        console.log(err);
    }
};

const examsList =
    (id, testId, v = "", classNo = "") =>
    async (dispatch) => {
        try {
            const exams = await axiosFetch.get(
                `/api/schools/${id}/tests/${testId}/exams`,
                {
                    params: { classNo: 9, group: v },
                }
            );
            console.log(exams);
            // setExs(exams.data);
            if (exams.data.length === 0) {
                console.log(exams.data);
                const total = 0;
                const da = [];

                dispatch({ type: types.EXAMS_LIST, payload: [] });
                dispatch(donutExams(da, total));
            } else {
                let total = 0;

                Object.values(exams.data[0].answers).forEach((ans) => {
                    total += ans.sectionOutOf;
                });

                const da = [];

                const dat = exams.data.map((el) => el.marks);

                da.push(
                    dat.reduce(
                        (acc, cur) => {
                            if (cur >= total * 0.75) {
                                acc.count += 1;
                            }
                            return { ...acc };
                        },
                        { label: "≥ 75%", count: 0 }
                    )
                );
                da.push(
                    dat.reduce(
                        (acc, cur) => {
                            console.log(acc, cur);
                            if (cur >= total * 0.5 && cur < total * 0.75) {
                                acc.count += 1;
                            }
                            return { ...acc };
                        },
                        { label: "50-75%", count: 0 }
                    )
                );
                da.push(
                    dat.reduce(
                        (acc, cur) => {
                            console.log(acc, cur);
                            if (cur >= total * 0.35 && cur < total * 0.5) {
                                acc.count += 1;
                            }
                            return { ...acc };
                        },
                        { label: "35-50%", count: 0 }
                    )
                );
                da.push(
                    dat.reduce(
                        (acc, cur) => {
                            console.log(acc, cur);
                            if (cur >= total * 0 && cur < total * 0.35) {
                                acc.count += 1;
                            }
                            return { ...acc };
                        },
                        { label: "0-35%", count: 0 }
                    )
                );
                console.log(da);
                // setDaa(da);

                dispatch({ type: types.EXAMS_LIST, payload: exams.data });
                dispatch(donutExams(da, total));
            }
            // dispatch(examActions.outOf(total));
        } catch (err) {
            console.log(err);
        }
    };

const onSectionSubmit = (id, testId) => async (dispatch, getState) => {
    try {
        const { selectedSectionId, selectedSectionNo } = getState().custom;
        const { answers } = getState();
        const { examId } = getState().exam;
        const ansObj = { selectedSectionId, selectedSectionNo, answers };

        if (Object.keys(answers).length !== 0) {
            await axiosFetch.patch(
                `/api/schools/${id}/tests/${testId}/exams/${examId}`,
                ansObj
            );

            dispatch(answerActions.emptyAnswers());
            dispatch(questionActions.emptyQuestions());
            dispatch(customActions.selectedQuestion(1));
            dispatch(customActions.selectedSectionNo(1));
            dispatch(customActions.selectedSectionId(null));
            dispatch(customActions.examSuccess("success"));
            // dispatch(emptyExam());

            Router.push("/exam-success");
        } else {
            console.log("gggg");
            dispatch(deleteExam());
            dispatch(customActions.examSuccess(""));
            Router.push("/exam-success");
        }
    } catch (err) {
        console.log(err.response.data);
    }
};

const onSectionChange =
    (id, testId, sectionId, sectionNo) => async (dispatch, getState) => {
        try {
            const { selectedSectionId, selectedSectionNo } = getState().custom;
            const { answers } = getState();
            const { examId } = getState().exam;
            const ansObj = { selectedSectionId, selectedSectionNo, answers };

            const exam = await axiosFetch.patch(
                `/api/schools/${id}/tests/${testId}/exams/${examId}`,
                ansObj
            );

            dispatch(customActions.selectedSectionId(sectionId));
            dispatch(customActions.selectedSectionNo(sectionNo));
            dispatch(answerActions.emptyAnswers());
            dispatch(questionActions.emptyQuestions());
            dispatch(answerActions.fetchAnwers(exam.data.answers[sectionNo]));
            dispatch(customActions.selectedQuestion(1));
        } catch (err) {
            console.log(err.response.data);
        }
    };

const examActions = {
    createExam,
    deleteExam,
    donutExams,
    outOf,
    examResult,
    examsList,
    onSectionSubmit,
    onSectionChange,
    emptyExam,
};

export default examActions;
