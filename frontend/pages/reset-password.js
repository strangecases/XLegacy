import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { Form, Button, Card, Row, Col } from "antd";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "../components/formitems/FormInput";
import authStyles from "../styles/modules/pageStyles/Auth.module.css";
import { resetPasswordSchema } from "../yupUtil";
import IsNotLoggedIn from "../components/routes/isNotLoggedIn";
import axiosFetch from "../axiosFetch";

const ResetPassword = () => {
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

    const onResetPassword = async ({ email, code, newPassword }) => {
        try {
            await axiosFetch.post("/api/reset-password", {
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
        <IsNotLoggedIn>
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
        </IsNotLoggedIn>
    );
};

export default ResetPassword;
