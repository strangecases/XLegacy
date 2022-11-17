import Router from "next/router";
import { toast } from "react-toastify";
import * as types from "../types";
import customActions from "./customActions";
import axiosFetch from "../../axiosFetch";
import loadingActions from "./loadingActions";

const emptyQuestions = () => {
    return {
        type: types.EMPTY_QUESTIONS,
    };
};

const fetchQuestions = (testId, sectionId) => async (dispatch) => {
    try {
        dispatch(loadingActions.questionsLoading(true));
        const response = await axiosFetch.get(
            `/api/tests/${testId}/sections/${sectionId}`
        );

        dispatch(emptyQuestions());

        dispatch({
            type: types.FETCH_QUESTIONS,
            payload: response.data.questions,
        });
        dispatch(customActions.isQuestionsEmpty(response.data.isEmpty));
        dispatch(customActions.isQuestionsFull(response.data.isFull));

        dispatch(loadingActions.questionsLoading(false));
    } catch (err) {
        dispatch(loadingActions.questionsLoading(false));

        console.log(err);
    }
};

const editQuestion =
    ({ formValues, noToast = false }) =>
    async (dispatch) => {
        try {
            // const response = await axiosFetch.patch(
            //     `/api/tests/${testId}/sections/${sectionId}`,
            //     formValues
            // );
            dispatch({ type: types.EDIT_QUESTION, payload: formValues });
            if (!noToast) {
                toast.success("Question added, save before refresh", {
                    autoClose: 2200,
                    hideProgressBar: true,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

const deleteQuestion = (questionNo) => async (dispatch) => {
    try {
        // await axiosFetch.delete(`/api/tests/${testId}/sections/${sectionId}`);
        dispatch({ type: types.DELETE_QUESTION, payload: questionNo });
    } catch (err) {
        console.log(err);
    }
};

const upOnDeletion = (data) => {
    return {
        type: types.FETCH_QUESTIONS,
        payload: data,
    };
};

const onSectionClick =
    ({
        testId,
        sectionId,
        sectionNo,
        save = false,
        publish = false,
        id = "",
    }) =>
    async (dispatch, getState) => {
        try {
            const { questions } = getState();
            const { selectedSectionId } = getState().custom;
            const questionList = Object.values(questions);

            if (!publish) {
                dispatch(loadingActions.questionSaveLoading(true));
                await axiosFetch.patch(
                    `/api/tests/${testId}/sections/${selectedSectionId}`,
                    { questions: questionList }
                );
                if (!save) {
                    dispatch(customActions.selectedSectionId(sectionId));
                    dispatch(customActions.selectedSectionNo(sectionNo));
                    dispatch(emptyQuestions());
                    dispatch(customActions.selectedQuestion(1));
                    dispatch(customActions.saveSection(true));
                } else if (save) {
                    toast.success("Saved", {
                        hideProgressBar: true,
                        autoClose: 1200,
                    });
                }
                dispatch(loadingActions.questionSaveLoading(false));
            } else if (publish) {
                dispatch(loadingActions.questionSaveLoading(true));

                await axiosFetch.patch(
                    `/api/tests/${testId}/sections/${selectedSectionId}`,
                    { questions: questionList, isPublished: publish }
                );
                toast.success("Published", {
                    hideProgressBar: true,
                    autoClose: 1200,
                });
                dispatch(loadingActions.questionSaveLoading(false));

                Router.push(`/schools/${id}/tests/${testId}`);
            }
        } catch (err) {
            dispatch(loadingActions.questionsLoading(false));
            dispatch(loadingActions.questionSaveLoading(false));
            toast.error(err.response.data, {
                autoClose: 2200,
                hideProgressBar: true,
            });
        }
    };

const questionActions = {
    fetchQuestions,
    editQuestion,
    deleteQuestion,
    upOnDeletion,
    emptyQuestions,
    onSectionClick,
};

export default questionActions;
