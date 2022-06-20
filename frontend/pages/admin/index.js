import { Card, Form, Row, Col, Button, Spin } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomLayout from "../../components/nav/CustomLayout";
import AdminRoute from "../../components/routes/AdminRoute";
import FormInput from "../../components/formitems/FormInput";
import authStyles from "../../styles/modules/pageStyles/Auth.module.css";
import AdminCard from "../../components/AdminCard";
import allActions from "../../store/actions";
import { adminDetailsEditSchema } from "../../yupUtil";

const AdminIndex = () => {
    const { admin } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        control,
        setValue,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(adminDetailsEditSchema),
    });

    useEffect(() => {
        if (admin) {
            setValue("email", admin.email);
            setValue("name", admin.name);
        }
    }, [admin]);

    const onSubmit = async (data) => {
        dispatch(allActions.adminActions.editAdmin(admin._id, data));
    };

    return (
        <AdminRoute>
            {console.log(process.env.NEXT_PUBLIC_BACK_URL)}
            {admin ? (
                <Row gutter={[24, 16]} justify="center">
                    <Col xs={24} md={{ span: 20 }} lg={{ span: 15 }} span={15}>
                        <Row
                            justify="center"
                            gutter={[8, 8]}
                            className={authStyles["admin-row"]}
                        >
                            <Col span={24}>
                                <h5
                                    className={`${authStyles["text-center"]}
                                ${authStyles["margin-top"]} ${authStyles["form-heading-color"]}`}
                                >
                                    Edit your details
                                </h5>
                            </Col>
                            <Col xs={24} md={24} lg={24} xl={20} span={24}>
                                <Form
                                    onFinish={handleSubmit(onSubmit)}
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    <Card className={authStyles["blue-tint"]}>
                                        <FormInput
                                            control={control}
                                            errors={errors}
                                            name="email"
                                            placeholder="Enter email"
                                            type="email"
                                            label="Email"
                                            labelColmn={3}
                                            wrapperColmn={21}
                                            redLabel
                                        />
                                        <FormInput
                                            control={control}
                                            errors={errors}
                                            name="name"
                                            placeholder="Enter name"
                                            type="name"
                                            label="Name"
                                            labelColmn={3}
                                            wrapperColmn={21}
                                            redLabel
                                        />
                                    </Card>
                                    <h6
                                        className={`${authStyles["text-center"]}
                                ${authStyles["margin-top"]} ${authStyles["form-heading-color"]}`}
                                    >
                                        Change Password
                                    </h6>
                                    <Card className={authStyles["blue-tint"]}>
                                        <FormInput
                                            control={control}
                                            errors={errors}
                                            name="password"
                                            placeholder="Enter current password"
                                            type="password"
                                            label="Current password"
                                        />
                                        <FormInput
                                            control={control}
                                            errors={errors}
                                            name="newPassword"
                                            placeholder="Enter new password"
                                            type="password"
                                            label="New password"
                                        />
                                        <FormInput
                                            control={control}
                                            errors={errors}
                                            name="confirmPassword"
                                            placeholder="Confirm new password"
                                            type="password"
                                            label="Confirm password"
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
                                                "Apply changes"
                                            )}
                                        </Button>
                                    </Card>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} md={{ span: 20 }} lg={{ span: 9 }} span={9}>
                        <Row>
                            <Col span={24}>
                                <Card className={authStyles["admin-card"]}>
                                    <AdminCard />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ) : (
                <Spin
                    size="large"
                    className={authStyles["admin-spin-position"]}
                    indicator={
                        <SyncOutlined
                            spin
                            className={authStyles["admin-spin-icon"]}
                        />
                    }
                />
            )}
        </AdminRoute>
    );
};

AdminIndex.getLayout = (page) => <CustomLayout>{page}</CustomLayout>;

export default AdminIndex;
