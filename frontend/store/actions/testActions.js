import Router from "next/router";
import { toast } from "react-toastify";
import * as types from "../types";
import modalActions from "./modalActions";
import axiosFetch from "../../axiosFetch";
import loadingActions from "./loadingActions";

const createTest = (id, formValues) => async (dispatch, getState) => {
    try {
        dispatch(loadingActions.modalOkLoading(true));
        const { admin } = getState().auth;
        const response = await axiosFetch.post(`/api/schools/${id}/tests`, {
            ...formValues,
            author: admin._id,
        });
        dispatch({ type: types.CREATE_TEST, payload: response.data });
        dispatch(modalActions.visibleTestNo());
        Router.push(`/schools/${id}/tests/${response.data._id}`);
        dispatch(loadingActions.modalOkLoading(false));
    } catch (err) {
        console.log(err);
        dispatch(modalActions.visibleTestNo());
        dispatch(loadingActions.modalOkLoading(false));
        toast.error("Something went wrong, please try again later!", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const fetchTests =
    (id, page = 1, pageSize = 4) =>
    async (dispatch) => {
        try {
            const response = await axiosFetch.get(`/api/schools/${id}/tests`, {
                params: { page, pageSize },
            });
            dispatch({ type: types.EMPTY_TESTS });
            dispatch({ type: types.FETCH_TESTS, payload: response.data.tests });
            dispatch({
                type: types.TOTAL_TESTS,
                payload: response.data.numOfTests,
            });
            // console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

const fetchTest = (id, testId) => async (dispatch) => {
    try {
        const response = await axiosFetch.get(
            `/api/schools/${id}/tests/${testId}`
        );
        // console.log(response.data);
        dispatch({ type: types.FETCH_TEST, payload: response.data });
    } catch (err) {
        console.log(err);
        Router.push("/admin");
        toast.error("No test found", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const editTest = (id, testId, formValues) => async (dispatch) => {
    try {
        dispatch(loadingActions.modalOkLoading(true));
        const response = await axiosFetch.patch(
            `/api/schools/${id}/tests/${testId}`,
            formValues
        );
        dispatch({ type: types.EDIT_TEST, payload: response.data });
        dispatch(modalActions.visibleTestNo());
        Router.push(`/schools/${id}/tests/${testId}`);
        dispatch(loadingActions.modalOkLoading(false));
    } catch (err) {
        console.log(err.response.data);
        dispatch(modalActions.visibleTestNo());
        dispatch(loadingActions.modalOkLoading(false));
        toast.error("Something went wrong, please try again later!", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const deleteTest = (id, testId) => async (dispatch) => {
    try {
        dispatch(loadingActions.deleteLoading(true));
        await axiosFetch.delete(`/api/schools/${id}/tests/${testId}`);
        dispatch({ type: types.DELETE_TEST, payload: testId });
        dispatch(modalActions.visibleDeleteTestNo());
        Router.push(`/schools/${id}/tests`);
        dispatch(loadingActions.deleteLoading(false));
    } catch (err) {
        console.log(err.response.data);
        dispatch(modalActions.visibleDeleteTestNo());
        dispatch(loadingActions.deleteLoading(false));
        toast.error("Something went wrong, please try again later!", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const createSectionOnTest = (id, testId, formValues) => async (dispatch) => {
    try {
        dispatch(loadingActions.modalOkLoading(true));
        const response = await axiosFetch.post(
            `/api/tests/${testId}/sections`,
            formValues
        );
        dispatch({ type: types.EDIT_TEST, payload: response.data.test });
        dispatch(modalActions.visibleSectionNo());
        Router.push(`/schools/${id}/tests/${testId}`);
        dispatch(loadingActions.modalOkLoading(false));
    } catch (err) {
        console.log(err.response.data);
        dispatch(modalActions.visibleSectionNo());
        dispatch(loadingActions.modalOkLoading(false));
        toast.error("Something went wrong, please try again later!", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const editSectionOnTest =
    (id, testId, formValues) => async (dispatch, getState) => {
        try {
            dispatch(loadingActions.modalOkLoading(true));
            const { selectedSectionId } = getState().custom;
            await axiosFetch.patch(
                `/api/tests/${testId}/sections/${selectedSectionId}`,
                formValues
            );
            dispatch(modalActions.visibleSectionNo());
            Router.push(`/schools/${id}/tests/${testId}/sections`);
            dispatch(loadingActions.modalOkLoading(false));
        } catch (err) {
            console.log(err.response.data);
            dispatch(modalActions.visibleSectionNo());
            dispatch(loadingActions.modalOkLoading(false));
            toast.error("Something went wrong, please try again later!", {
                autoClose: 2200,
                hideProgressBar: true,
            });
        }
    };

const deleteSectionOnTest = (id, testId) => async (dispatch, getState) => {
    try {
        dispatch(loadingActions.deleteLoading(true));
        const { selectedSectionId } = getState().custom;
        const { tests } = getState();
        const response = await axiosFetch.delete(
            `/api/tests/${testId}/sections/${selectedSectionId}`
        );
        // console.log(response.data.sectionNo);
        /* sectionData */
        // console.log(tests[testId].sections.length);
        /* sectionData */
        if (response.data.sectionNo < tests[testId].sections.length) {
            /* sectionData */
            // console.log(tests[testId].sections.slice(response.data.sectionNo));
            /* sectionData */
            tests[testId].sections
                .slice(response.data.sectionNo)
                .forEach(async (sect) => {
                    // console.log(sect);
                    const sectionNum = sect.sectionNo - 1;
                    const sectionData = { ...sect, sectionNo: sectionNum };
                    // console.log(sectionData);
                    await axiosFetch.patch(
                        `/api/tests/${testId}/sections/${sect._id}`,
                        sectionData
                    );
                });
        }
        dispatch(modalActions.visibleDeleteSectionNo());
        Router.push(`/schools/${id}/tests/${testId}`);
        dispatch(loadingActions.deleteLoading(false));
    } catch (err) {
        console.log(err.response.data);
        dispatch(modalActions.visibleDeleteSectionNo());
        dispatch(loadingActions.deleteLoading(false));
        toast.error("Something went wrong, please try again later!", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const testActions = {
    fetchTests,
    fetchTest,
    createTest,
    editTest,
    deleteTest,
    createSectionOnTest,
    editSectionOnTest,
    deleteSectionOnTest,
};

export default testActions;
