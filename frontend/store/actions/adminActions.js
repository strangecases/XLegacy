import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import * as types from "../types";

const logIn = (data) => async (dispatch) => {
    try {
        const response = await axios.post("/api/login", { ...data });
        dispatch({
            type: types.LOGIN,
            payload: response.data,
        });
        toast.success("Login Successful", {
            autoClose: 2200,
            hideProgressBar: true,
        });
    } catch (err) {
        toast.error("Username or password is incorrect", {
            autoClose: 2200,
            hideProgressBar: true,
        });
        console.log(err.response);
    }
};

const logOut = () => async (dispatch) => {
    try {
        await axios.get("/api/logout");
        dispatch({
            type: types.LOGOUT,
        });
        console.log("logouttt");
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
        const response = await axios.patch(
            `/api/register/${adminId}`,
            formValues
        );
        if (
            formValues.password &&
            formValues.confirmPassword &&
            formValues.newPassword
        ) {
            dispatch({ type: types.LOGOUT });
            toast.success(
                "Changes were successfully applied, Login with new password",
                {
                    autoClose: 2200,
                    hideProgressBar: true,
                }
            );
            Router.push("/login");
        } else {
            dispatch({ type: types.LOGIN, payload: response.data });

            toast.success("Changes were successfully applied", {
                autoClose: 2200,
                hideProgressBar: true,
            });
        }
    } catch (err) {
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
