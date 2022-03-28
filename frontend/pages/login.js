import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../context";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // state
    const { state, dispatch } = useContext(Context);
    const { user } = state;

    // router
    const router = useRouter();

    useEffect(() => {
        if (user !== null) {
            router.push("/");
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post("/api/login", {
                email,
                password,
            });

            // dispactch login action
            dispatch({
                type: "LOGIN",
                payload: data,
            });

            // save in local storage
            window.localStorage.setItem("user", JSON.stringify(data));

            // toast.success("Registration Successful, Please login");
            // setLoading(false);
            // redirect
            router.push("/");
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary">Login</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="form-control mb-4 p-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                    <input
                        type="password"
                        className="form-control mb-4 p-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary col-12"
                        disabled={!email || !password || loading}
                    >
                        {loading ? <SyncOutlined spin /> : "Submit"}
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
