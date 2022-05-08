import { Controller } from "react-hook-form";
import { Card, Col, Form, Input, Row, Button, Divider, Tooltip } from "antd";
import {
    PlusCircleFilled,
    PlusSquareFilled,
    MinusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import FormItem from "../FormItem";
import ClassGroup from "./ClassGroup";

const SchoolForm = ({
    control,
    errors,
    append,
    remove,
    fields,
    isDirty = false,
    isSubmitting = false,
}) => {
    return (
        <>
            <Card>
                <Row>
                    <Col span={24}>
                        <FormItem
                            name="schoolName"
                            control={control}
                            errors={errors}
                            type="text"
                            placeholder="school name"
                            label="School Name"
                        />
                    </Col>
                    <Col span={24}>
                        <FormItem
                            name="schoolCode"
                            control={control}
                            errors={errors}
                            type="text"
                            placeholder="school code"
                            label="School Code"
                        />
                    </Col>
                </Row>
            </Card>
            <Divider orientation="left">Add Classes</Divider>
            {fields.map((item, index) => {
                return (
                    <Card key={item.id}>
                        <Row gutter={16}>
                            <Col span={20}>
                                <Form.Item
                                    help={
                                        errors.classes &&
                                        errors.classes[index] &&
                                        errors.classes[index].classNo
                                            ? errors.classes[index].classNo
                                                  ?.message
                                            : ""
                                    }
                                    validateStatus={
                                        errors.classes &&
                                        errors.classes[index] &&
                                        errors.classes[index].classNo &&
                                        errors.classes[index].classNo.message
                                            ? "error"
                                            : "success"
                                    }
                                    label="Class No"
                                >
                                    <Controller
                                        name={`classes.${index}.classNo`}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="number"
                                                {...field}
                                                placeholder="class number (5,6,7...)"
                                            />
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <MinusCircleOutlined
                                    onClick={() => remove(index)}
                                    className="hover-icon-delete test-submit-delete"
                                />
                            </Col>
                            <Col offset={3} span={17}>
                                <ClassGroup
                                    errors={
                                        errors.classes &&
                                        errors.classes[index]?.groups
                                    }
                                    control={control}
                                    nestIndex={index}
                                />
                            </Col>
                        </Row>
                    </Card>
                );
            })}
            <Card>
                <Row justify="center" gutter={32}>
                    <Col>
                        <Tooltip
                            color="#2db7f5"
                            title="Add Classes"
                            placement="left"
                        >
                            <PlusCircleFilled
                                className="hover-icon-submit test-submit-delete"
                                onClick={() => append({})}
                            />
                        </Tooltip>
                    </Col>
                    <Col>
                        <Button
                            disabled={!isDirty || isSubmitting}
                            type="primary"
                            htmlType="submit"
                        >
                            {isSubmitting ? <SyncOutlined spin /> : "Submit"}
                        </Button>
                    </Col>
                    {console.log(isSubmitting, isDirty)}
                </Row>
            </Card>
        </>
    );
};

export default SchoolForm;
