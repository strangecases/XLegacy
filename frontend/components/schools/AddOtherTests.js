import { Col, Card, Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addOtherTestSchema } from "../../yupUtil";
import allActions from "../../store/actions";
import allComponentsStyle from "../../styles/modules/componentStyles/AllComponents.module.css";

const AddOtherTests = () => {
    const { otherTestsLoading } = useSelector((state) => state.load);

    const dispatch = useDispatch();

    const router = useRouter();
    const { id } = router.query;

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(addOtherTestSchema),
    });

    const onSubmit = (data) => {
        dispatch(
            allActions.schoolActions.editSchool({
                id,
                formValues: {
                    classNo: "otherTests",
                    testId: data.link.split("exams/")[1].slice(0, 24),
                    type: "edit",
                },
                link: data.link,
                editType: "otherTests",
            })
        );
    };

    return (
        <Col span={24}>
            <Card
                className={`inner-card-padding-small-marginbottom ${allComponentsStyle["add-other-tests-overflow"]}`}
            >
                <Form
                    onFinish={handleSubmit(onSubmit)}
                    autoComplete="off"
                    className={allComponentsStyle["add-other-tests-flex"]}
                >
                    <Form.Item
                        className={`${allComponentsStyle["add-other-tests-formItem"]}`}
                        help={errors.link ? errors.link?.message : ""}
                        validateStatus={
                            errors.link && errors.link.message
                                ? "error"
                                : "success"
                        }
                    >
                        <Controller
                            control={control}
                            name="link"
                            render={({ field }) => (
                                <Input
                                    placeholder="Provide test link here"
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Button
                        htmlType="submit"
                        danger
                        className={allComponentsStyle["add-other-tests-button"]}
                        loading={otherTestsLoading}
                    >
                        Add Other Schools Test
                    </Button>
                </Form>

                {/* <Row justify="center" gutter={0}>
                    <Col span={21}>
                        <Form
                            layout="inline"
                            onFinish={handleSubmit(onSubmit)}
                            autoComplete="off"
                            className={
                                allComponentsStyle["add-other-tests-form"]
                            }
                        >
                            <Row gutter={[8]} justify="center">
                                <Col xs={24} sm={12} md={14} lg={18}>
                                    <Form.Item
                                        className={`inline-form ${allComponentsStyle["add-other-tests-formItem"]}`}
                                        help={
                                            errors.link
                                                ? errors.link?.message
                                                : ""
                                        }
                                        validateStatus={
                                            errors.link && errors.link.message
                                                ? "error"
                                                : "success"
                                        }
                                    >
                                        <Controller
                                            control={control}
                                            name="link"
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Provide test link here"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={10} lg={6}>
                                    <Button
                                        htmlType="submit"
                                        danger
                                        className={
                                            allComponentsStyle[
                                                "add-other-tests-button"
                                            ]
                                        }
                                    >
                                        {isSubmitting ? (
                                            <LoadingOutlined spin />
                                        ) : (
                                            "Add Other Schools Test"
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row> */}
            </Card>
        </Col>
    );
};

export default AddOtherTests;
