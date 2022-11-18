import { toast } from "react-toastify";
import Router from "next/router";
import * as types from "../types";
import axiosFetch from "../../axiosFetch";

const principleLogin = (data) => async (dispatch) => {
    try {
        const response = await axiosFetch.post("/api/principle/login", {
            ...data,
        });
        dispatch({
            type: types.LOGIN,
            payload: response.data,
        });
        dispatch({
            type: types.ROLE,
            payload: response.data.role,
        });
        toast.success("Login Successful", {
            autoClose: 2200,
            hideProgressBar: true,
        });
        Router.push("/principle-example");
    } catch (err) {
        toast.error("Username or password is incorrect", {
            autoClose: 2200,
            hideProgressBar: true,
        });
        // console.log(err.response);
    }
};

const principleLogout = () => async (dispatch) => {
    try {
        await axiosFetch.get("/api/principle/logout");
        dispatch({
            type: types.LOGOUT,
        });
        dispatch({ type: types.ROLE, payload: "" });
        // console.log("logouttt");
        toast.success("Logout Successful", {
            autoClose: 2200,
            hideProgressBar: true,
        });
        Router.push("/principle-login");
    } catch (err) {
        toast.error("logout failed", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const principleActions = {
    principleLogin,
    principleLogout,
};

export default principleActions;
