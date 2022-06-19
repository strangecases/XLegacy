import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Card } from "antd";
import FormInput from "../components/formitems/FormInput";
import authStyles from "../styles/modules/pageStyles/Auth.module.css";
import { registerSchema } from "../yupUtil";
import IsNotLoggedIn from "../components/routes/isNotLoggedIn";

const Register = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(registerSchema),
    });

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
        <IsNotLoggedIn>
            <h2 className={authStyles.headingAuth}>Sign Up</h2>

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
                                name="name"
                                placeholder="Enter name"
                                type="text"
                            />
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
                            <FormInput
                                control={control}
                                errors={errors}
                                name="adminCode"
                                placeholder="Enter admin code"
                                type="text"
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
                            Already registered?
                            <Link href="/login">
                                <a> Login</a>
                            </Link>
                        </p>
                    </Card>
                </Col>
            </Row>
        </IsNotLoggedIn>
    );
};
export default Register;
