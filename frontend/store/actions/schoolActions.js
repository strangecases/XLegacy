import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import modalActions from "./modalActions";
import * as types from "../types";

const createSchool = (formValues) => async (dispatch, getState) => {
    try {
        const { admin } = getState().auth;
        const classes = formValues?.classes.sort((a, b) => {
            return a.classNo - b.classNo;
        });
        const data = { ...formValues, classes };
        console.log(data);
        const response = await axios.post(`/api/schools`, {
            ...data,
            admin: admin._id,
        });
        dispatch({ type: types.CREATE_SCHOOL, payload: response.data });
        Router.push("/schools");
    } catch (err) {
        console.log(err.response.data);
        if (err.response.data.includes("E11000")) {
            toast.error("School code is already taken, use different code", {
                autoClose: 2200,
                hideProgressBar: true,
            });
        }
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
    (id, classNo = "", year = "", page = 1, pageSize = 4) =>
    async (dispatch) => {
        try {
            const response = await axios.get(`/api/schools/${id}`, {
                params: { year, classNo, page, pageSize },
            });
            console.log(response);
            dispatch({
                type: types.FETCH_SCHOOL,
                payload: response.data.school,
            });
            dispatch({
                type: types.TOTAL_CLASS_TESTS,
                payload: response.data.noOfClassTests,
            });
        } catch (err) {
            console.log(err.response.data);
        }
    };

const editSchool = (id, formValues) => async (dispatch) => {
    try {
        const classes = formValues?.classes.sort((a, b) => {
            return a.classNo - b.classNo;
        });
        const data = { ...formValues, classes };
        const response = await axios.patch(`/api/schools/${id}`, data);
        dispatch({ type: types.EDIT_SCHOOL, payload: response.data });
    } catch (err) {
        console.log(err.response.data);
    }
};

const deleteSchool = (id) => async (dispatch, getState) => {
    try {
        const { schools } = getState();
        await axios.delete(`/api/schools/${id}`);
        toast.success(`${schools[id].schoolName} is deleted`, {
            autoClose: 2200,
            hideProgressBar: true,
        });
        dispatch({ type: types.DELETE_SCHOOL, payload: id });
        dispatch(modalActions.visibleDeleteSectionNo());
        Router.push("/schools");
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
