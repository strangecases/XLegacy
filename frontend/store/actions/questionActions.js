import axios from "axios";
import { toast } from "react-toastify";
import * as types from "../types";

const fetchQuestions = (testId, sectionId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `/api/tests/${testId}/sections/${sectionId}`
        );

        dispatch({
            type: types.FETCH_QUESTIONS,
            payload: response.data.questions,
        });
    } catch (err) {
        console.log(err);
    }
};

const editQuestion = (formValues) => async (dispatch) => {
    try {
        // const response = await axios.patch(
        //     `/api/tests/${testId}/sections/${sectionId}`,
        //     formValues
        // );
        dispatch({ type: types.EDIT_QUESTION, payload: formValues });
        toast.success("Question added, save before refresh", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteQuestion = (questionNo) => async (dispatch) => {
    try {
        // await axios.delete(`/api/tests/${testId}/sections/${sectionId}`);
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

const emptyQuestions = () => {
    return {
        type: types.EMPTY_QUESTIONS,
    };
};

const questionActions = {
    fetchQuestions,
    editQuestion,
    deleteQuestion,
    upOnDeletion,
    emptyQuestions,
};

export default questionActions;
