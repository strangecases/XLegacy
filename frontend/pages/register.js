// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { SyncOutlined } from "@ant-design/icons";
// import Link from "next/link";
// import { useRouter } from "next/router";

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);

//     const user = useSelector((state) => state.auth);

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
//             await axios.post("/api/register", {
//                 name,
//                 email,
//                 password,
//             });

//             toast.success("Registration Successful, Please login");
//             setLoading(false);
//         } catch (err) {
//             toast.error(err.response.data);
//             console.log(err.response);
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <h1 className="jumbotron text-center bg-primary">register</h1>

//             <div className="container col-md-4 offset-md-4 pb-5">
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         className="form-control mb-4 p-4"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Enter Name"
//                         required
//                     />
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
//                         disabled={!name || !email || !password || loading}
//                     >
//                         {loading ? <SyncOutlined spin /> : "Submit"}
//                     </button>
//                 </form>

//                 <p className="text-center p-3">
//                     Already registered?
//                     <Link href="/login">
//                         <a> Login</a>
//                     </Link>
//                 </p>
//             </div>
//         </>
//     );
// };
// export default Register;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Form, Button } from "antd";
import FormItem from "../components/FormItem";

const schema = yup
    .object()
    .shape({
        name: yup.string().required("name is required"),
        email: yup
            .string()
            .email("email format is wrong")
            .required("email is required"),
        password: yup
            .string()
            .min(6, "password should be minimum 6 characters long")
            .max(16)
            .required("password is required"),
        adminCode: yup.string().required("Admin code is required"),
    })
    .required();

const Register = () => {
    const { admin } = useSelector((state) => state.auth);

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
        if (admin !== null) {
            router.push("/");
        }
    }, [admin, router]);

    const onSubmit = async (data) => {
        const { name, email, password, adminCode } = data;

        try {
            await axios.post("/api/register", {
                name,
                email,
                password,
                adminCode,
            });

            toast.success("Registration Successful, Please login");
        } catch (err) {
            toast.error(err.response.data);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary">register</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <Form onFinish={handleSubmit(onSubmit)}>
                    <FormItem
                        control={control}
                        errors={errors}
                        name="name"
                        placeholder="Enter name"
                        type="text"
                    />
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
                    <FormItem
                        control={control}
                        errors={errors}
                        name="adminCode"
                        placeholder="Enter admin code"
                        type="text"
                    />
                    {/* <input
                        type="text"
                        className="form-control mt-4 p-2"
                        {...register("name")}
                        placeholder="Enter Name"
                        required
                    />
                    {!!errors.name && (
                        <div className="text-danger ps-2 mt-1">
                            {errors?.name?.message}
                        </div>
                    )}
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
                    <input
                        type="text"
                        className="form-control mt-4 p-2"
                        {...register("adminCode")}
                        placeholder="Enter admin code"
                        required
                    />
                    {!!errors.adminCode && (
                        <div className="text-danger ps-2 mt-1">
                            {errors?.adminCode?.message}
                        </div>
                    )} */}
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-primary col-12"
                        disabled={!isDirty || isSubmitting}
                    >
                        {isSubmitting ? <SyncOutlined spin /> : "Submit"}
                    </Button>
                </Form>

                <p className="text-center p-3">
                    Already registered?
                    <Link href="/login">
                        <a> Login</a>
                    </Link>
                </p>
            </div>
        </>
    );
};
export default Register;
