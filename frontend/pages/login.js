import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Card, Form, Row, Col } from "antd";
import allActions from "../store/actions";
import FormInput from "../components/formitems/FormInput";
import authStyles from "../styles/modules/Auth.module.css";
import { loginSchema } from "../yupUtil";

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
        resolver: yupResolver(loginSchema),
    });

    useEffect(() => {
        console.log(admin);
        if (admin !== null) {
            router.push("/admin");
        }
    }, [admin, router]);

    const onSubmit = async ({ email, password }) => {
        console.log({ email, password });
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
            router.push("/admin");
        } catch (err) {
            toast.error(err.response.data);
            console.log(err.response);
        }
    };

    return (
        <>
            <h2 className={authStyles.headingAuth}>Login</h2>

            <Row justify="center">
                <Col xs={22} sm={12} md={10} lg={8} span={8}>
                    <Card className={authStyles["blue-tint"]}>
                        <Form
                            onFinish={handleSubmit(onSubmit)}
                            autoComplete="off"
                            noValidate
                        >
                            <FormInput
                                control={control}
                                errors={errors}
                                name="email"
                                placeholder="Enter email"
                                type="email"
                            />
                            <FormInput
                                control={control}
                                errors={errors}
                                name="password"
                                placeholder="Enter password"
                                type="password"
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={authStyles["width-100"]}
                                disabled={!isDirty || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <SyncOutlined spin />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Form>

                        <p
                            className={`${authStyles["text-center"]}
                                ${authStyles["margin-top"]}`}
                        >
                            Not yet registered?
                            <Link href="/register">
                                <a> Register</a>
                            </Link>
                        </p>
                        <p className={authStyles["text-center"]}>
                            <Link href="/forgot-password">
                                <a className="text-danger"> Forgot Password</a>
                            </Link>
                        </p>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default Login;
