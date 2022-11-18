import { toast } from "react-toastify";
import Router from "next/router";
import * as types from "../types";
import axiosFetch from "../../axiosFetch";
import loadingActions from "./loadingActions";

const logIn = (data) => async (dispatch) => {
    try {
        dispatch(loadingActions.loginLoading(true));
        const response = await axiosFetch.post("/api/login", { ...data });
        dispatch({
            type: types.LOGIN,
            payload: response.data,
        });
        dispatch({
            type: types.ROLE,
            payload: "Admin",
        });
        toast.success("Login Successful", {
            autoClose: 2200,
            hideProgressBar: true,
        });
        dispatch(loadingActions.loginLoading(false));
        Router.push("/admin");
    } catch (err) {
        dispatch(loadingActions.loginLoading(false));
        toast.error("Username or password is incorrect", {
            autoClose: 2200,
            hideProgressBar: true,
        });
        // console.log(err.response);
    }
};

const logOut = () => async (dispatch) => {
    try {
        await axiosFetch.get("/api/logout");
        dispatch({
            type: types.LOGOUT,
        });
        dispatch({ type: types.ROLE, payload: "" });
        // console.log("logouttt");
        toast.success("Logout Successful", {
            autoClose: 2200,
            hideProgressBar: true,
        });
        Router.push("/login");
    } catch (err) {
        toast.error("logout failed", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    }
};

const editAdmin = (adminId, formValues) => async (dispatch) => {
    try {
        dispatch(loadingActions.loginLoading(true));
        const response = await axiosFetch.patch(
            `/api/register/${adminId}`,
            formValues
        );
        if (
            formValues.password &&
            formValues.confirmPassword &&
            formValues.newPassword
        ) {
            await axiosFetch.get("/api/logout");
            dispatch({ type: types.LOGOUT });
            toast.success(
                "Changes were successfully applied, Login with new password",
                {
                    autoClose: 2200,
                    hideProgressBar: true,
                }
            );
            Router.push("/login");
            dispatch(loadingActions.loginLoading(false));
        } else {
            dispatch({ type: types.LOGIN, payload: response.data });

            toast.success("Changes were successfully applied", {
                autoClose: 2200,
                hideProgressBar: true,
            });
            dispatch(loadingActions.loginLoading(false));
        }
    } catch (err) {
        dispatch(loadingActions.loginLoading(false));
        if (err.response.data.includes("E11000")) {
            toast.error("email or name  already taken, try another", {
                autoClose: 2200,
                hideProgressBar: true,
            });
        } else {
            toast.error(err.response.data, {
                autoClose: 2200,
                hideProgressBar: true,
            });
        }
    }
};

const adminActions = {
    logIn,
    logOut,
    editAdmin,
};

export default adminActions;
