import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
    .object()
    .shape({
        email: yup
            .string()
            .email("email format is wrong")
            .required("email is required"),
        code: yup.string().required("Six digit code sent to your mail"),
        newPassword: yup
            .string()
            .min(6, "password should be minimum 6 characters long")
            .max(16)
            .required("password is required"),
    })
    .required();

const ResetPassword = () => {
    // state
    const { user } = useSelector((state) => state.auth);

    // router
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    // redirect if user is logged in
    useEffect(() => {
        if (user !== null) {
            router.push("/");
        }
    }, [user, router]);

    const onResetPassword = async ({ email, code, newPassword }) => {
        try {
            await axios.post("/api/reset-password", {
                email,
                code,
                newPassword,
            });

            toast("Great! Now you can login with your new password");
            router.push("/login");
        } catch (err) {
            toast(err.response.data);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary">Reset Password</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form
                    onSubmit={handleSubmit(onResetPassword)}
                    autoComplete="off"
                    noValidate
                >
                    <input
                        type="email"
                        className="form-control mt-4 p-2"
                        {...register("email")}
                        placeholder="Enter email"
                        required
                    />
                    {!!errors.email && (
                        <div className="text-danger ps-2">
                            {errors?.email?.message}
                        </div>
                    )}

                    <input
                        type="text"
                        className="form-control mt-4 p-2"
                        {...register("code")}
                        placeholder="Enter email"
                        required
                    />
                    {!!errors.code && (
                        <div className="text-danger ps-2">
                            {errors?.code?.message}
                        </div>
                    )}
                    <input
                        type="password"
                        className="form-control mt-4 p-2"
                        {...register("newPassword")}
                        placeholder="Enter password"
                        required
                    />
                    {!!errors.newPassword && (
                        <div className="text-danger ps-2">
                            {errors?.newPassword?.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary col-12 mt-4"
                        disabled={isSubmitting || !isDirty}
                    >
                        {isSubmitting ? <SyncOutlined spin /> : "Submit"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
