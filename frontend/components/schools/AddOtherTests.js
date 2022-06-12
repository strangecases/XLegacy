import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Card, Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addOtherTestSchema } from "../../yupUtil";
import allActions from "../../store/actions";

const AddOtherTests = () => {
    // const { selectedClass } = useSelector((state) => state.custom);

    const dispatch = useDispatch();

    const router = useRouter();
    const { id } = router.query;

    const {
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
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
                style={{ overflow: "hidden" }}
                className="inner-card-padding-small-marginbottom"
            >
                <Row justify="center" gutter={0}>
                    <Col>
                        <Form
                            layout="inline"
                            onFinish={handleSubmit(onSubmit)}
                            autoComplete="off"
                        >
                            <Form.Item
                                className="inline-form"
                                help={errors.link ? errors.link?.message : ""}
                                validateStatus={
                                    errors.link && errors.link.message
                                        ? "error"
                                        : "success"
                                }
                                style={{
                                    width: "45vw",
                                }}
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

                            <Button htmlType="submit" danger>
                                {isSubmitting ? (
                                    <LoadingOutlined spin />
                                ) : (
                                    "Add Other Schools Test"
                                )}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default AddOtherTests;
