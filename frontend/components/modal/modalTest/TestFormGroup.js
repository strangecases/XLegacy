import { Form, Select, Tooltip, Row, Col } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { useRouter } from "next/router";
import FormItem from "../../formitems/FormItem";
import allActions from "../../../store/actions";
import SelectOption from "../../formitems/SelectOption";

const { Option } = Select;

const TestFormGroup = ({ control, errors, path = "test" }) => {
    const { schools } = useSelector((state) => state);
    const { selectedClass } = useSelector((state) => state.custom);

    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();

    // useEffect(() => {
    //     // if (id && path==='edit') dispatch(allActions.schoolActions.fetchSchool(id));

    // }, [selectedClass]);

    return (
        <Row justify="center">
            <Col span={18}>
                <Form id="myForm">
                    <FormItem
                        control={control}
                        errors={errors}
                        name="testTitle"
                        placeholder="Enter test title"
                        type="text"
                    />
                    <FormItem
                        control={control}
                        errors={errors}
                        name="testTime"
                        placeholder="Enter test time"
                        type="number"
                    />
                    <Tooltip
                        color="#40e68b"
                        placement="topRight"
                        title={
                            path === "edit"
                                ? "You can not change the class, create new test instead."
                                : ""
                        }
                    >
                        <Form.Item
                            help={errors.classNo ? errors.classNo?.message : ""}
                            validateStatus={
                                errors.classNo && errors.classNo.message
                                    ? "error"
                                    : "success"
                            }
                        >
                            <Controller
                                control={control}
                                name="classNo"
                                render={({ field }) => (
                                    <Select
                                        // defaultValue={
                                        //     selectedClass !== ""
                                        //         ? selectedClass
                                        //         : "0"
                                        // }
                                        // defaultValue="0"
                                        value={
                                            selectedClass === "" ||
                                            selectedClass === "otherTests"
                                                ? "0"
                                                : selectedClass
                                        }
                                        {...field}
                                        disabled={path === "edit"}
                                    >
                                        <Option value="0">
                                            Select class number
                                        </Option>
                                        {schools[id] &&
                                            schools[id].classes.map((cls) => {
                                                return (
                                                    <Option
                                                        value={cls.classNo}
                                                        key={cls.classNo}
                                                    >
                                                        {cls.classNo}
                                                    </Option>
                                                );
                                            })}
                                    </Select>
                                )}
                            />
                        </Form.Item>
                    </Tooltip>
                    {/* <Tooltip
                    color="#40e68b"
                    placement="topRight"
                    title={
                        path === "edit"
                            ? "You can not change the class, create new test instead."
                            : ""
                    }
                >
                    <SelectOption
                        control={control}
                        errors={errors}
                        name="classNo"
                        label="Select Class Number"
                        list={schools[id] && schools[id].classes}
                        path={path}
                    />
                </Tooltip> */}

                    <FormItem
                        control={control}
                        errors={errors}
                        name="testCode"
                        placeholder="Enter test code"
                        type="text"
                    />
                </Form>
                <p className="text-center">
                    Go back to
                    <Link href="/admin">
                        <a> Dashboard</a>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

export default TestFormGroup;
