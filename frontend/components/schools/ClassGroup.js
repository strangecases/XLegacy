import { Controller, useFieldArray } from "react-hook-form";
import { Card, Form, Input, Row, Col, Tooltip } from "antd";
import { MinusCircleOutlined, PlusCircleFilled } from "@ant-design/icons";

const ClassGroup = ({ control, nestIndex, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `classes.${nestIndex}.groups`,
    });

    return (
        <Card className="inner-card-padding">
            {fields.map((item, k) => {
                return (
                    <Row
                        key={item.id}
                        gutter={{ xs: 2, lg: 4 }}
                        justify="center"
                    >
                        <Col xs={21} lg={18} span={18}>
                            <Form.Item
                                help={
                                    errors && errors[k] && errors[k]?.group
                                        ? errors[k].group?.message
                                        : ""
                                }
                                validateStatus={
                                    errors &&
                                    errors[k] &&
                                    errors[k]?.group &&
                                    errors[k].group.message
                                        ? "error"
                                        : "success"
                                }
                                label="Class Group"
                            >
                                <Controller
                                    control={control}
                                    name={`classes.${nestIndex}.groups.${k}.group`}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="a or b ..."
                                        />
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2} lg={4} span={4} offset={1}>
                            <MinusCircleOutlined
                                onClick={() => remove(k)}
                                className="hover-icon-delete-small test-submit-delete-small"
                            />
                        </Col>
                    </Row>
                );
            })}
            <Row justify="center">
                <Col>
                    <Tooltip
                        title="Add Sections/Groups"
                        placement="left"
                        color="#2db7f5"
                    >
                        <PlusCircleFilled
                            onClick={() => append({})}
                            className="hover-icon-submit-small test-submit-delete-small"
                        />
                    </Tooltip>
                </Col>
            </Row>
        </Card>
    );
};

export default ClassGroup;
