import axios from "axios";
import * as types from "../types";
import customActions from "./customActions";

const createTest = (id, formValues) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/api/schools/${id}/tests`);
        dispatch({ type: types.CREATE_TEST, payload: response.data });
    } catch (err) {
        console.log(err.response.data);
    }
};

const fetchTests =
    (id, page = 1, pageSize = 4) =>
    async (dispatch) => {
        try {
            const response = await axios.get(`/api/schools/${id}/tests`, {
                params: { page, pageSize },
            });
            dispatch({ type: types.EMPTY_TESTS });
            dispatch({ type: types.FETCH_TESTS, payload: response.data.tests });
            dispatch({
                type: types.TOTAL_TESTS,
                payload: response.data.numOfTests,
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

const fetchTest = (id, testId) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/schools/${id}/tests/${testId}`);
        dispatch({ type: types.FETCH_TEST, payload: response.data });
    } catch (err) {
        console.log(err);
    }
};

const editTest = (id, testId, formValues) => async (dispatch) => {
    try {
        const response = await axios.patch(
            `/api/schools/${id}/tests/${testId}`,
            formValues
        );
        dispatch({ type: types.EDIT_TEST, payload: response.data });
        dispatch(customActions.visibleTestNo());
    } catch (err) {
        console.log(err.response.data);
    }
};

const deleteTest = (id, testId) => async (dispatch) => {
    try {
        await axios.delete(`/api/schools/${id}/tests/${testId}`);
        dispatch({ type: types.DELETE_TEST, payload: id });
        dispatch(customActions.visibleDeleteTestNo());
    } catch (err) {
        console.log(err.response.data);
    }
};

const createSectionOnTest = (id, testId, formValues) => async (dispatch) => {
    try {
        const response = await axios.post(
            `/api/schools/${id}/tests/${testId}/sections`,
            formValues
        );
        dispatch({ type: types.EDIT_TEST, payload: response.data });
        dispatch(customActions.visibleSectionNo());
    } catch (err) {
        console.log(err.response.data);
    }
};

const testActions = {
    fetchTests,
    fetchTest,
    createTest,
    editTest,
    deleteTest,
    createSectionOnTest,
};

export default testActions;
