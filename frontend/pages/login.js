// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { SyncOutlined } from "@ant-design/icons";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import allActions from "../store/actions";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);

//     // state
//     const { user } = useSelector((state) => state.auth);

//     const dispatch = useDispatch();

//     // router
//     const router = useRouter();

//     useEffect(() => {
//         if (user !== null) {
//             router.push("/");
//         }
//     }, [user, router]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);
//             const { data } = await axios.post("/api/login", {
//                 email,
//                 password,
//             });

//             // dispactch login action
//             dispatch(allActions.userActions.logIn(data));

//             // save in local storage

//             // toast.success("Registration Successful, Please login");
//             // setLoading(false);
//             // redirect
//             router.push("/");
//         } catch (err) {
//             toast.error(err.response.data);
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <h1 className="jumbotron text-center bg-primary">Login</h1>

//             <div className="container col-md-4 offset-md-4 pb-5">
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="email"
//                         className="form-control mb-4 p-4"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter email"
//                         required
//                     />
//                     <input
//                         type="password"
//                         className="form-control mb-4 p-4"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter password"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="btn btn-primary col-12"
//                         disabled={!email || !password || loading}
//                     >
//                         {loading ? <SyncOutlined spin /> : "Submit"}
//                     </button>
//                 </form>

//                 <p className="text-center pt-3">
//                     Not Yet registered?
//                     <Link href="/register">
//                         <a> Register</a>
//                     </Link>
//                 </p>
//                 <p className="text-center">
//                     <Link href="/forgot-password">
//                         <a className="text-danger"> Forgot Password</a>
//                     </Link>
//                 </p>
//             </div>
//         </>
//     );
// };
// export default Login;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import allActions from "../store/actions";

const schema = yup
    .object()
    .shape({
        email: yup
            .string()
            .email("email format is wrong")
            .required("email is required"),
        password: yup
            .string()
            .min(6, "password should be minimum 6 characters long")
            .max(16)
            .required("password is required"),
    })
    .required();

const Login = () => {
    // state
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

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

    useEffect(() => {
        if (user !== null) {
            router.push("/");
        }
    }, [user, router]);

    const onSubmit = async ({ email, password }) => {
        try {
            const { data } = await axios.post("/api/login", {
                email,
                password,
            });

            // dispactch login action
            dispatch(allActions.userActions.logIn(data));

            // save in local storage

            toast.success("Registration Successful, Please login");
            // redirect
            router.push("/");
        } catch (err) {
            toast.error(err.response.data);
            console.log(err.response);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary">Login</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    autoComplete="off"
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
                        type="password"
                        className="form-control mt-4 p-2"
                        {...register("password")}
                        placeholder="Enter password"
                        required
                    />
                    {!!errors.password && (
                        <div className="text-danger ps-2">
                            {errors?.password?.message}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="btn btn-primary mt-4 col-12"
                        disabled={!isDirty || isSubmitting}
                    >
                        {isSubmitting ? <SyncOutlined spin /> : "Submit"}
                    </button>
                </form>

                <p className="text-center pt-3">
                    Not Yet registered?
                    <Link href="/register">
                        <a> Register</a>
                    </Link>
                </p>
                <p className="text-center">
                    <Link href="/forgot-password">
                        <a className="text-danger"> Forgot Password</a>
                    </Link>
                </p>
            </div>
        </>
    );
};
export default Login;
