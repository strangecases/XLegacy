import axios from "axios";
import * as types from "../types";
import customActions from "./customActions";

const createTest = (formValues) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/api/prepare/tests`);
        dispatch({ type: types.CREATE_TEST, payload: response.data });
    } catch (err) {
        console.log(err.response.data);
    }
};

const fetchTests = () => async (dispatch) => {
    try {
        const response = await axios.get(`/api/prepare/tests`);
        dispatch({ type: types.FETCH_TESTS, payload: response.data });
    } catch (err) {
        console.log(err.response.data);
    }
};

const fetchTest = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/prepare/tests/${id}`);
        dispatch({ type: types.FETCH_TEST, payload: response.data });
    } catch (err) {
        console.log(err.response.data);
    }
};

const editTest = (id, formValues) => async (dispatch) => {
    try {
        const response = await axios.patch(
            `/api/prepare/tests/${id}`,
            formValues
        );
        dispatch({ type: types.EDIT_TEST, payload: response.data });
        dispatch(customActions.visibleTestNo());
    } catch (err) {
        console.log(err.response.data);
    }
};

const deleteTest = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/prepare/tests/${id}`);
        dispatch({ type: types.DELETE_TEST, payload: id });
        dispatch(customActions.visibleDeleteTestNo());
    } catch (err) {
        console.log(err.response.data);
    }
};

const createSectionOnTest = (id, formValues) => async (dispatch) => {
    try {
        const response = await axios.post(
            `/api/prepare/tests/${id}/sections`,
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
