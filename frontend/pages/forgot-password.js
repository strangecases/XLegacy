import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Button, Form, Card, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import FormInput from "../components/formitems/FormInput";
import authStyles from "../styles/modules/pageStyles/Auth.module.css";
import { forgotPasswordSchema } from "../yupUtil";
import IsNotLoggedIn from "../components/routes/isNotLoggedIn";
import axiosFetch from "../axiosFetch";

const ForgotPassword = () => {
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

    const onSubmit = async ({ email }) => {
        console.log(email);
        try {
            await axiosFetch.post("/api/forgot-password", {
                email,
            });
            toast("Check your email for secret code");
            router.push("/reset-password");
        } catch (err) {
            toast(err.response.data);
        }
    };

    return (
        <IsNotLoggedIn>
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
        </IsNotLoggedIn>
    );
};

export default ForgotPassword;
