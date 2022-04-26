import axios from "axios";
import { toast } from "react-toastify";
import * as types from "../types";

const fetchQuestions = (id, sectionId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `/api/prepare/tests/${id}/sections/${sectionId}`
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
        //     `/api/prepare/tests/${id}/sections/${sectionId}`,
        //     formValues
        // );
        dispatch({ type: types.EDIT_QUESTION, payload: formValues });
        toast.success("Question added, save before refresh", {
            autoClose: 1100,
            hideProgressBar: true,
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteQuestion = (questionNo) => async (dispatch) => {
    try {
        // await axios.delete(`/api/prepare/tests/${id}/sections/${sectionId}`);
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

const questionActions = {
    fetchQuestions,
    editQuestion,
    deleteQuestion,
    upOnDeletion,
};

export default questionActions;
