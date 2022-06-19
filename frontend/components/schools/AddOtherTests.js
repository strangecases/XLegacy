import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Card, Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addOtherTestSchema } from "../../yupUtil";
import allActions from "../../store/actions";
import allComponentsStyle from "../../styles/modules/componentStyles/AllComponents.module.css";

const AddOtherTests = () => {
    // const { selectedClass } = useSelector((state) => state.custom);

    const dispatch = useDispatch();

    const router = useRouter();
    const { id } = router.query;

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(addOtherTestSchema),
    });

    const onSubmit = (data) => {
        dispatch(
            allActions.schoolActions.editSchool(id, {
                classNo: "otherTests",
                testId: data.link.slice(61, 85),
                type: "edit",
            })
        );
        router.push(`/schools/${id}/tests/${data.link.slice(61, 85)}`);
    };

    return (
        <Col span={24}>
            <Card
                className={`inner-card-padding-small-marginbottom ${allComponentsStyle["add-other-tests-overflow"]}`}
            >
                <Row justify="center" gutter={0}>
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
                </Row>
            </Card>
        </Col>
    );
};

export default AddOtherTests;
