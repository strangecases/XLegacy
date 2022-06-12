import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Form, Card, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import FormInput from "../components/formitems/FormInput";
import authStyles from "../styles/modules/Auth.module.css";
import { forgotPasswordSchema } from "../yupUtil";

const ForgotPassword = () => {
    // state
    const { admin } = useSelector((state) => state.auth);

    // router
    const router = useRouter();

    const {
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        control,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(forgotPasswordSchema),
    });

    // redirect if admin is logged in
    useEffect(() => {
        if (admin !== null) {
            router.push("/");
        }
    }, [admin, router]);

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
            <h2 className={authStyles.headingAuth}>Forgot Password</h2>
            <Row justify="center">
                <Col xs={22} sm={12} md={10} lg={8} span={8}>
                    <Card className={authStyles["blue-tint"]}>
                        <Form
                            onFinish={handleSubmit(onSubmit)}
                            autoComplete="off"
                            noValidate
                        >
                            <FormInput
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                control={control}
                                errors={errors}
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={authStyles["width-100"]}
                                disabled={isSubmitting || !isDirty}
                            >
                                {isSubmitting ? (
                                    <SyncOutlined spin />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ForgotPassword;
