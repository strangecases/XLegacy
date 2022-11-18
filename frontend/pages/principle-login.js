import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Card, Form, Row, Col } from "antd";
import allActions from "../store/actions";
import FormInput from "../components/formitems/FormInput";
import authStyles from "../styles/modules/pageStyles/Auth.module.css";
import { loginSchema } from "../yupUtil";
// import PrincipleNotLoggedIn from "../components/routes/PrincipleNotLoggedIn";

const PrincipleLogin = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async ({ username, password }) => {
        dispatch(
            allActions.principleActions.principleLogin({ username, password })
        );
    };

    const router = useRouter();

    useEffect(() => {
        router.push("404");
    }, [router]);

    return (
        // <PrincipleNotLoggedIn>
        <>
            <h2 className={authStyles.headingAuth}>Principle Login</h2>

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
                                name="username"
                                placeholder="Enter username"
                                type="text"
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
        // </PrincipleNotLoggedIn>
    );
};
export default PrincipleLogin;
