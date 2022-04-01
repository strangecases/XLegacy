// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { SyncOutlined } from "@ant-design/icons";
// import { useRouter } from "next/router";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [success, setSuccess] = useState(false);
//     const [code, setCode] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [loading, setLoading] = useState(false);

//     // state
//     const { user } = useSelector((state) => state.auth);

//     // router
//     const router = useRouter();

//     // redirect if user is logged in
//     useEffect(() => {
//         if (user !== null) {
//             router.push("/");
//         }
//     }, [user, router]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const { data } = await axios.post("/api/forgot-password", {
//                 email,
//             });
//             setSuccess(true);
//             toast("Check your email for secret code");
//             setLoading(false);
//         } catch (err) {
//             setLoading(false);
//             toast(err.response.data);
//         }
//     };

//     const handleResetPassword = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);
//             const { data } = await axios.post("/api/reset-password", {
//                 email,
//                 code,
//                 newPassword,
//             });

//             setEmail("");
//             setCode("");
//             setNewPassword("");
//             setLoading(false);
//             toast("Great! Now you can login with your new password");
//             router.push("/login");
//         } catch (err) {
//             setLoading(false);
//             toast(err.response.data);
//         }
//     };

//     return (
//         <>
//             <h1 className="jumbotron text-center bg-primary">
//                 {success ? "Reset Password" : "Forgot Password"}
//             </h1>
//             <div className="container col-md-4 offset-md-4 pb-5">
//                 <form onSubmit={success ? handleResetPassword : handleSubmit}>
//                     <input
//                         type="email"
//                         className="form-control mb-3 p-3"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter Email"
//                         required
//                     />
//                     {success && (
//                         <>
//                             <input
//                                 type="text"
//                                 className="form-control mb-3 p-3"
//                                 value={code}
//                                 onChange={(e) => setCode(e.target.value)}
//                                 placeholder="Enter secret code"
//                                 required
//                             />
//                             <input
//                                 type="password"
//                                 className="form-control mb-3 p-3"
//                                 value={newPassword}
//                                 onChange={(e) => setNewPassword(e.target.value)}
//                                 placeholder="Enter new password"
//                                 required
//                             />
//                         </>
//                     )}
//                     <button
//                         type="submit"
//                         className="btn btn-primary col-12 mt-2"
//                         disabled={loading || !email}
//                     >
//                         {loading ? <SyncOutlined spin /> : "Submit"}
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default ForgotPassword;

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
    })
    .required();

const ForgotPassword = () => {
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

    const onSubmit = async ({ email }) => {
        console.log(email);
        try {
            await axios.post("/api/forgot-password", {
                email,
            });
            toast("Check your email for secret code");
            router.push("/reset-password");
        } catch (err) {
            toast(err.response.data);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary">
                Forgot Password
            </h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
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

export default ForgotPassword;
