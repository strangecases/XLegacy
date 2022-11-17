import Router from "next/router";
// import { message } from "antd";
import { toast } from "react-toastify";
import customActions from "./customActions";
import modalActions from "./modalActions";
import * as types from "../types";
import axiosFetch from "../../axiosFetch";
import loadingActions from "./loadingActions";

const createSchool = (formValues) => async (dispatch, getState) => {
    try {
        dispatch(loadingActions.schoolSubmitLoading(true));
        const { admin } = getState().auth;
        const classes = formValues?.classes.sort((a, b) => {
            return a.classNo - b.classNo;
        });
        const data = { ...formValues, classes };
        // console.log(data);
        const response = await axiosFetch.post(`/api/schools`, {
            ...data,
            admin: admin._id,
        });
        dispatch({ type: types.CREATE_SCHOOL, payload: response.data });
        dispatch(loadingActions.schoolSubmitLoading(false));

        Router.push("/schools");
    } catch (err) {
        dispatch(loadingActions.schoolSubmitLoading(false));
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
        const response = await axiosFetch.get(`/api/schools`);
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
            const response = await axiosFetch.get(`/api/schools/${id}`, {
                params: { year, classNo, page, pageSize },
            });
            // console.log(response);
            dispatch({
                type: types.FETCH_SCHOOL,
                payload: response.data.school,
            });

            dispatch(
                customActions.totalClassTests(response.data.noOfClassTests)
            );
        } catch (err) {
            dispatch(customActions.totalClassTests(0));
            console.log(err.response.data);
        }
    };

const editSchool =
    ({ id, formValues = {}, link = "none", editType = "edit" }) =>
    async (dispatch) => {
        try {
            if (editType === "edit") {
                dispatch(loadingActions.schoolSubmitLoading(true));
                const classes = formValues?.classes.sort((a, b) => {
                    return a.classNo - b.classNo;
                });
                const data = { ...formValues, classes };
                const response = await axiosFetch.patch(
                    `/api/schools/${id}`,
                    data
                );
                dispatch({ type: types.EDIT_SCHOOL, payload: response.data });
                dispatch(loadingActions.schoolSubmitLoading(false));
                Router.push("/schools/");
            } else if (editType === "otherTests") {
                if (
                    link !== "none" &&
                    link.split("schools/")[1].slice(0, 24) === id
                ) {
                    toast.error(
                        "This test is already added under your school",
                        {
                            autoClose: 2200,
                            hideProgressBar: true,
                        }
                    );
                } else {
                    dispatch(loadingActions.otherTestsLoading(true));
                    const data = { ...formValues };
                    const response = await axiosFetch.patch(
                        `/api/schools/${id}`,
                        data
                    );
                    dispatch({
                        type: types.EDIT_SCHOOL,
                        payload: response.data,
                    });

                    if (link !== "none") {
                        Router.push(
                            `/schools/${id}/tests/${link
                                .split("exams/")[1]
                                .slice(0, 24)}`
                        );
                    } else if (formValues?.type === "delete") {
                        Router.push(`/schools/${id}/tests`);
                    }
                    dispatch(loadingActions.otherTestsLoading(false));
                }
            }
        } catch (err) {
            dispatch(loadingActions.schoolSubmitLoading(false));
            dispatch(loadingActions.otherTestsLoading(false));
            toast.error(err?.response?.data, {
                autoClose: 2200,
                hideProgressBar: true,
            });

            // console.log(err);
        }
    };

const deleteSchool = (id) => async (dispatch, getState) => {
    try {
        dispatch(loadingActions.deleteLoading(true));
        const { schools } = getState();
        await axiosFetch.delete(`/api/schools/${id}`);
        toast.success(`${schools[id].schoolName} is deleted`, {
            autoClose: 2200,
            hideProgressBar: true,
        });
        dispatch({ type: types.DELETE_SCHOOL, payload: id });
        dispatch(modalActions.visibleDeleteSchoolNo());
        Router.push("/schools");
        dispatch(loadingActions.deleteLoading(false));
    } catch (err) {
        dispatch(loadingActions.deleteLoading(false));
        console.log(err.response.data);
    }
};

const createTestOnSchool = (id, formValues) => async (dispatch) => {
    try {
        const response = await axiosFetch.post(
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
        dispatch(loadingActions.searchLoading(true));
        const response = await axiosFetch.get("/api/schools/search", {
            params: {
                schoolCode: formValue.toLowerCase(),
                type: "search",
            },
        });

        dispatch({ type: "FETCH_SCHOOL", payload: response.data });

        Router.push(`/schools/${response.data._id}/exams`);
        dispatch(loadingActions.searchLoading(false));
    } catch (err) {
        dispatch(loadingActions.searchLoading(false));
        toast.error("School does not exist, type in appropriate school code", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const otherTestsClassMsg = (id) => async (dispatch) => {
    try {
        const response = await axiosFetch.patch(`/api/schools/${id}`, {
            type: "otherTestsClassMsg",
        });
        dispatch({ type: types.EDIT_SCHOOL, payload: response.data });
    } catch (err) {
        toast.error(err?.response?.data, {
            autoClose: 2200,
            hideProgressBar: true,
        });
        // console.log(err.response);
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
    otherTestsClassMsg,
};

export default schoolActions;
