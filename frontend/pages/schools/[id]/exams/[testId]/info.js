import { Card, Form, Row, Col, Button, Input, Layout } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import allActions from "../../../../../store/actions";
import { examSchema } from "../../../../../yupUtil";
import FormInput from "../../../../../components/formitems/FormInput";
import SelectOption from "../../../../../components/formitems/SelectOption";
import ExamNavNew from "../../../../../components/nav/ExamNavNew";
import examInfoStyle from "../../../../../styles/modules/pageStyles/ExamInfo.module.css";

// const { Option } = Select;

const Info = () => {
    const router = useRouter();
    const { id, testId } = router.query;

    const { tests, schools } = useSelector((state) => state);
    const { examInfoLoading } = useSelector((state) => state.load);

    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
        setValue,
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(examSchema),
    });

    const onSubmit = async (data) => {
        dispatch(allActions.examActions.createExam(id, testId, data));
    };

    useEffect(() => {
        // dispatch(allActions.answerActions.emptyAnswers());
        // dispatch(allActions.questionActions.emptyQuestions());
        // dispatch(allActions.customActions.selectedSectionId(undefined));
        // dispatch(allActions.customActions.selectedSectionNo(1));
        if (id && testId) {
            dispatch(allActions.testActions.fetchTest(id, testId));
            dispatch(allActions.schoolActions.fetchSchool(id));
        }
    }, [id, testId, dispatch]);

    useEffect(() => {
        if (tests[testId]) {
            setValue("classNo", tests[testId].classNo);
        }
    }, [testId, tests, setValue]);

    useEffect(() => {
        dispatch(allActions.customActions.examSaved(false));
        dispatch(allActions.loadingActions.examSavedLoading(false));
        dispatch(allActions.answerActions.emptyAnswers());
        dispatch(allActions.examActions.deleteExam());
        dispatch(allActions.questionActions.emptyQuestions());
        dispatch(allActions.customActions.selectedSectionId(undefined));
        dispatch(allActions.customActions.selectedSectionNo(1));
        dispatch(allActions.customActions.selectedQuestion(1));
    }, [dispatch]);

    return (
        <Layout className={examInfoStyle["exam-layout"]}>
            <Row justify="center" className={examInfoStyle["exam-info-row"]}>
                <Col xs={21} sm={14} md={12} lg={10} span={10}>
                    <Card>
                        <Form
                            onFinish={handleSubmit(onSubmit)}
                            autoComplete="off"
                        >
                            <FormInput
                                control={control}
                                errors={errors}
                                name="studentName"
                                placeholder="Enter your name"
                                type="text"
                                label="Student name"
                                labelColmn={7}
                                wrapperColmn={17}
                            />
                            <FormInput
                                control={control}
                                errors={errors}
                                name="schoolCode"
                                placeholder="Enter school code"
                                type="text"
                                label="School code"
                                labelColmn={7}
                                wrapperColmn={17}
                            />
                            <FormInput
                                control={control}
                                errors={errors}
                                name="testCode"
                                placeholder="Enter test code"
                                type="text"
                                label="Test code"
                                labelColmn={7}
                                wrapperColmn={17}
                            />
                            <FormInput
                                control={control}
                                errors={errors}
                                name="parentsPhNo"
                                placeholder="Parent phone no"
                                type="text"
                                label="Parent PhoneNo"
                                labelColmn={7}
                                wrapperColmn={17}
                            />
                            {/* <hr /> */}
                            <Row gutter={16} justify="center">
                                <Col xs={24} sm={12} lg={6} span={6}>
                                    <Form.Item label="Class">
                                        <Controller
                                            render={({ field }) => {
                                                return (
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        readOnly
                                                        className={
                                                            examInfoStyle[
                                                                "exam-info-align"
                                                            ]
                                                        }
                                                    />
                                                );
                                            }}
                                            // value={setValue(
                                            //     "classNo",
                                            //     tests[testId]?.classNo
                                            // )}
                                            name="classNo"
                                            control={control}
                                        />
                                    </Form.Item>
                                </Col>
                                {schools[id] && (
                                    <Col xs={24} sm={12} lg={9} span={9}>
                                        <SelectOption
                                            errors={errors}
                                            control={control}
                                            check="group"
                                            name="classGroup"
                                            list={
                                                schools[id]?.classes?.find(
                                                    (cls) =>
                                                        parseInt(
                                                            cls.classNo,
                                                            10
                                                        ) ===
                                                        tests[testId]?.classNo
                                                )?.groups
                                            }
                                            label="Group"
                                        />
                                        {/* <Form.Item label="group">
                                        <Controller
                                            render={({ field }) => (
                                                <Select
                                                    defaultValue="Select"
                                                    {...field}
                                                    style={{
                                                        textAlign: "center",
                                                        width: "100%",
                                                    }}
                                                >
                                                    {schools[id]?.classes
                                                        ?.find(
                                                            (cls) =>
                                                                parseInt(
                                                                    cls.classNo,
                                                                    10
                                                                ) ===
                                                                tests[testId]
                                                                    ?.classNo
                                                        )
                                                        ?.groups.map((elm) => (
                                                            <Option
                                                                value={
                                                                    elm.group
                                                                }
                                                                key={elm.group}
                                                                style={{
                                                                    textAlign:
                                                                        "center",
                                                                }}
                                                            >
                                                                {elm.group}
                                                            </Option>
                                                        ))}
                                                </Select>
                                            )}
                                            control={control}
                                            name="group"
                                        />
                                    </Form.Item> */}
                                    </Col>
                                )}
                            </Row>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="col-12"
                                disabled={!isDirty || isSubmitting}
                                loading={examInfoLoading}
                            >
                                Next
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};

Info.getLayout = (page) => <ExamNavNew type="intro">{page}</ExamNavNew>;

export default Info;
