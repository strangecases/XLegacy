import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { Form, Button, Card, Row, Col } from "antd";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "../components/formitems/FormInput";
import authStyles from "../styles/modules/Auth.module.css";
import { resetPasswordSchema } from "../yupUtil";

const ResetPassword = () => {
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
        resolver: yupResolver(resetPasswordSchema),
    });

    // redirect if user is logged in
    useEffect(() => {
        if (admin !== null) {
            router.push("/");
        }
    }, [admin, router]);

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
            toast(err);
        }
    };

    return (
        <>
            <h2 className={authStyles.headingAuth}>Reset Password</h2>
            <Row justify="center">
                <Col xs={22} sm={12} md={10} lg={8} span={8}>
                    <Card className={authStyles["blue-tint"]}>
                        <Form
                            onFinish={handleSubmit(onResetPassword)}
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
                            <FormInput
                                type="text"
                                placeholder="Enter code"
                                name="code"
                                control={control}
                                errors={errors}
                            />
                            <FormInput
                                type="password"
                                placeholder="Enter password"
                                name="newPassword"
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

export default ResetPassword;
