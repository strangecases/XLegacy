import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../context";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // context
    const {
        state: { user },
    } = useContext(Context);

    // router
    const router = useRouter();

    // redirect if user is logged in
    useEffect(() => {
        if (user !== null) {
            router.push("/");
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post("/api/forgot-password", {
                email,
            });
            setSuccess(true);
            toast("Check your email for secret code");
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast(err.response.data);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post("/api/reset-password", {
                email,
                code,
                newPassword,
            });

            setEmail("");
            setCode("");
            setNewPassword("");
            setLoading(false);
            toast("Great! Now you can login with your new password");
            router.push("/login");
        } catch (err) {
            setLoading(false);
            toast(err.response.data);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary">
                {success ? "Reset Password" : "Forgot Password"}
            </h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={success ? handleResetPassword : handleSubmit}>
                    <input
                        type="email"
                        className="form-control mb-3 p-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                    />
                    {success && (
                        <>
                            <input
                                type="text"
                                className="form-control mb-3 p-3"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Enter secret code"
                                required
                            />
                            <input
                                type="password"
                                className="form-control mb-3 p-3"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                            />
                        </>
                    )}
                    <button
                        type="submit"
                        className="btn btn-primary col-12 mt-2"
                        disabled={loading || !email}
                    >
                        {loading ? <SyncOutlined spin /> : "Submit"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
