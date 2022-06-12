import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import * as types from "../types";

const createSchool = (formValues) => async (dispatch, getState) => {
    try {
        const { admin } = getState().auth;
        const response = await axios.post(`/api/schools`, {
            ...formValues,
            admin: admin._id,
        });
        dispatch({ type: types.CREATE_SCHOOL, payload: response.data });
    } catch (err) {
        console.log(err.response.data);
    }
};

const fetchSchools = () => async (dispatch) => {
    try {
        const response = await axios.get(`/api/schools`);
        dispatch({ type: types.EMPTY_SCHOOLS });
        dispatch({ type: types.FETCH_SCHOOLS, payload: response.data });
    } catch (err) {
        console.log(err.response.data);
    }
};

const fetchSchool =
    (id, classNo = "", year = "") =>
    async (dispatch) => {
        try {
            const response = await axios.get(`/api/schools/${id}`, {
                params: { year, classNo },
            });
            dispatch({ type: types.FETCH_SCHOOL, payload: response.data });
        } catch (err) {
            console.log(err.response.data);
        }
    };

const editSchool = (id, formValues) => async (dispatch) => {
    try {
        const response = await axios.patch(`/api/schools/${id}`, formValues);
        dispatch({ type: types.EDIT_SCHOOL, payload: response.data });
    } catch (err) {
        console.log(err.response.data);
    }
};

const deleteSchool = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/schools/${id}`);
        dispatch({ type: types.DELETE_SCHOOL, payload: id });
    } catch (err) {
        console.log(err.response.data);
    }
};

const createTestOnSchool = (id, formValues) => async (dispatch) => {
    try {
        const response = await axios.post(
            `/api/schools/${id}/tests`,
            formValues
        );
        dispatch({ type: types.EDIT_SCHOOL, payload: response.data });
    } catch (err) {
        console.log(err.response.data);
    }
};

const getSchoolOnSearch = (formValue) => async (dispatch) => {
    try {
        const response = await axios.get("/api/schools/search", {
            params: {
                schoolCode: formValue.toLowerCase(),
                type: "search",
            },
        });

        dispatch({ type: "FETCH_SCHOOL", payload: response.data });

        Router.push(`/schools/${response.data._id}/exams`);
    } catch (err) {
        toast.error("School does not exist, type in appropriate school code", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const schoolActions = {
    fetchSchools,
    fetchSchool,
    createSchool,
    editSchool,
    deleteSchool,
    createTestOnSchool,
    getSchoolOnSearch,
};

export default schoolActions;
