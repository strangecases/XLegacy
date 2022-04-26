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
//     const { admin } = useSelector((state) => state.auth);

//     const dispatch = useDispatch();

//     // router
//     const router = useRouter();

//     useEffect(() => {
//         if (admin !== null) {
//             router.push("/");
//         }
//     }, [admin, router]);

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
import { Button, Form } from "antd";
import allActions from "../store/actions";
import FormItem from "../components/FormItem";

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
    const { admin } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    // router
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        console.log(admin);
        if (admin !== null) {
            router.push("/");
        }
    }, [admin, router]);

    const onSubmit = async ({ email, password }) => {
        try {
            const { data } = await axios.post("/api/login", {
                email,
                password,
            });

            // dispactch login action
            dispatch(allActions.adminActions.logIn(data));

            // save in local storage

            toast.success("Login Successful, Please login");
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
                <Form onFinish={handleSubmit(onSubmit)}>
                    <FormItem
                        control={control}
                        errors={errors}
                        name="email"
                        placeholder="Enter email"
                        type="email"
                    />
                    <FormItem
                        control={control}
                        errors={errors}
                        name="password"
                        placeholder="Enter password"
                        type="password"
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-primary mt-4 col-12"
                        disabled={!isDirty || isSubmitting}
                    >
                        {isSubmitting ? <SyncOutlined spin /> : "Submit"}
                    </Button>
                </Form>

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
