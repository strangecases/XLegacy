import { Controller } from "react-hook-form";
import {
    Card,
    Col,
    Form,
    Input,
    Row,
    Button,
    Divider,
    Tooltip,
    Popconfirm,
    Space,
} from "antd";
import { PlusCircleFilled, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormItem from "../formitems/FormItem";
import ClassGroup from "./ClassGroup";
import DeleteSchoolForm from "../modal/modalSchool/DeleteSchoolForm";
import allActions from "../../store/actions";
import allComponentsStyle from "../../styles/modules/componentStyles/AllComponents.module.css";

const SchoolForm = ({
    control,
    errors,
    append,
    remove,
    fields,
    isDirty = false,
    isSubmitting = false,
    path = "",
}) => {
    const [appe, setAppe] = useState(false);
    useEffect(() => {
        window.scrollTo({
            left: 0,
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }, [appe]);

    const { schoolSubmitLoading } = useSelector((state) => state.load);

    const dispatch = useDispatch();

    const appending = () => {
        append({});
        setAppe((prev) => !prev);
    };

    const onDelete = () => {
        dispatch(allActions.modalActions.visibleDeleteSchoolYes());
    };

    return (
        <div id="scroll">
            {/* {console.log(errors)} */}
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
                            labelColmn={7}
                            wrapperColmn={17}
                            redLabel
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
                            labelColmn={7}
                            wrapperColmn={17}
                            redLabel
                        />
                    </Col>
                    <Col span={24}>
                        <FormItem
                            name="schoolPhNo"
                            control={control}
                            errors={errors}
                            type="text"
                            placeholder="school phone number"
                            label="School Phone No"
                            labelColmn={7}
                            wrapperColmn={17}
                        />
                    </Col>
                    <Col span={24}>
                        <FormItem
                            name="schoolAddress"
                            control={control}
                            errors={errors}
                            type="text"
                            placeholder="school address"
                            label="School Address"
                            labelColmn={7}
                            wrapperColmn={17}
                            resize={false}
                        />
                    </Col>
                </Row>
            </Card>
            <Divider orientation="left">Add Classes</Divider>
            {fields.map((item, index) => {
                return (
                    <Card key={item.id}>
                        <Row justify="center" gutter={16}>
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
                                                onWheel={(e) => e.target.blur()}
                                                type="number"
                                                {...field}
                                                placeholder="class number (5,6,7...)"
                                            />
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Popconfirm
                                    placement={
                                        path === "edit" ? "top" : "right"
                                    }
                                    title={
                                        path === "edit"
                                            ? `Are you sure? This will delete all the tests you created under this class`
                                            : `Are you sure?`
                                    }
                                    okText="Yes"
                                    cancelText="No"
                                    // autoAdjustOverflow={false}
                                    onConfirm={() => remove(index)}
                                >
                                    <MinusCircleOutlined
                                        // onClick={() => remove(index)}
                                        className={`hover-icon-delete test-submit-delete ${allComponentsStyle["all-vertical-align-minus-two"]}`}
                                    />
                                </Popconfirm>
                            </Col>

                            <Col offset={0} xs={21} sm={17} md={16} span={17}>
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
            {errors?.classes?.message && (
                <Card
                    className={`inner-card-padding-none ${allComponentsStyle["card-error-message"]}`}
                >
                    {errors?.classes?.message}
                </Card>
            )}
            <Card>
                <Row justify="center" gutter={[32, 16]}>
                    <Col>
                        <Tooltip
                            color="#2db7f5"
                            title="Add Classes"
                            placement="left"
                            overlayClassName="tooltip-mobile-display-none"
                        >
                            <PlusCircleFilled
                                className={`hover-icon-submit-small test-submit-delete  ${allComponentsStyle["all-vertical-align-minus-two"]}`}
                                onClick={appending}
                            />
                        </Tooltip>
                    </Col>
                    <Col>
                        <Space size={[16, 8]} wrap>
                            <Button
                                disabled={!isDirty || isSubmitting}
                                type="primary"
                                htmlType="submit"
                                loading={schoolSubmitLoading}
                            >
                                Submit
                            </Button>
                            {path === "edit" && (
                                <>
                                    <Button
                                        disabled={!isDirty || isSubmitting}
                                        danger
                                        type="primary"
                                        onClick={onDelete}
                                    >
                                        Delete
                                    </Button>
                                    <DeleteSchoolForm />
                                </>
                            )}
                        </Space>
                    </Col>

                    {/* {console.log(isSubmitting, isDirty)} */}
                </Row>
            </Card>
        </div>
    );
};

export default SchoolForm;
