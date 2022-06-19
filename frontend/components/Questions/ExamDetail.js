import {
    Card,
    Row,
    Col,
    Form,
    Radio,
    Space,
    Input,
    Button,
    Divider,
    Popconfirm,
    message,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { EDIT_ANSWER } from "../../store/types";
import allActions from "../../store/actions";
import SegmentedSections from "./SegmentedSections";
import examDetailStyle from "../../styles/modules/componentStyles/ExamDetails.module.css";

const ExamDetail = () => {
    const [question, setQuestion] = useState({});

    const { questions } = useSelector((state) => state);
    const { answers } = useSelector((state) => state);
    const { selectedQuestion } = useSelector((state) => state.custom);

    const router = useRouter();
    const { id, testId } = router.query;

    const dispatch = useDispatch();

    const { handleSubmit, control, setValue } = useForm({
        mode: "onBlur",
        defaultValues: {},
    });

    const onSubmit = (data) => {
        console.log(data);
        // setValue("answer", data?.answer);
        dispatch({ type: EDIT_ANSWER, payload: data });
    };

    const onSectionSubmit = async () => {
        dispatch(allActions.customActions.examSaved(true));
        setTimeout(() => {
            dispatch(allActions.examActions.onSectionSubmit(id, testId));
            if (localStorage.getItem("end_date") != null)
                localStorage.removeItem("end_date");
            message.success("Successfully saved your work", 4);
            // dispatch(allActions.customActions.examSaved(false));
        }, 1000);
    };

    const onSectionCancel = () => {
        message.error("Continue Test");
        dispatch(allActions.customActions.examSaved(false));
    };

    useEffect(() => {
        if (
            selectedQuestion &&
            questions &&
            questions[selectedQuestion] &&
            questions[selectedQuestion].options
        ) {
            setQuestion(questions[selectedQuestion]);
        } else {
            setQuestion({});
        }
    }, [selectedQuestion, questions]);

    useEffect(() => {
        if (answers[selectedQuestion]) {
            setValue("answer", answers[selectedQuestion]);
        } else {
            setValue("answer", "");
        }
    }, [selectedQuestion, answers]);

    useEffect(() => {
        const elements = document.getElementsByClassName("hiii2");
        for (let i = 0; i < elements.length; i += 1) {
            elements[i].addEventListener("change", handleSubmit(onSubmit));
        }

        return () => {
            for (let i = 0; i < elements.length; i += 1) {
                elements[i].removeEventListener(
                    "change",
                    handleSubmit(onSubmit)
                );
            }
        };
    }, []);

    return (
        <>
            <SegmentedSections />
            <Form onFinish={handleSubmit(onSubmit)}>
                <Card>
                    <Row gutter={16}>
                        <Col xs={6} sm={4} md={5} lg={3} span={3}>
                            <Controller
                                className={
                                    examDetailStyle[
                                        "exam-detail-input-position"
                                    ]
                                }
                                value={setValue("questionNo", selectedQuestion)}
                                control={control}
                                name="questionNo"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className={
                                            examDetailStyle[
                                                "exam-detail-input-center"
                                            ]
                                        }
                                        readOnly
                                    />
                                )}
                            />
                        </Col>
                        <Col xs={16} md={18} lg={21} span={21}>
                            <Card
                                type="inner"
                                bordered={false}
                                className="exam-detail-inner-card"
                            >
                                {question.question}
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Card
                        type="inner"
                        bordered={false}
                        className="inner-card-padding"
                    >
                        <Controller
                            defaultValue="c"
                            control={control}
                            name="answer"
                            render={({ field }) => (
                                <Radio.Group {...field}>
                                    <Row>
                                        <Col span={20}>
                                            <Space
                                                direction="vertical"
                                                className={
                                                    examDetailStyle[
                                                        "exam-detail-space"
                                                    ]
                                                }
                                                size={0}
                                            >
                                                <Row>
                                                    <Col
                                                        xs={24}
                                                        md={21}
                                                        lg={20}
                                                        span={20}
                                                    >
                                                        <label
                                                            htmlFor="select-a"
                                                            className={
                                                                examDetailStyle[
                                                                    "exam-detail-label"
                                                                ]
                                                            }
                                                        >
                                                            <Card
                                                                hoverable
                                                                className="option-card inner-card-padding-zero"
                                                            >
                                                                <Radio
                                                                    className="hiii2"
                                                                    value="a"
                                                                    id="select-a"
                                                                >
                                                                    {question.options &&
                                                                        question
                                                                            .options
                                                                            .a}
                                                                </Radio>
                                                            </Card>
                                                        </label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={24}
                                                        md={21}
                                                        lg={20}
                                                        span={20}
                                                    >
                                                        <label
                                                            htmlFor="select-b"
                                                            className={
                                                                examDetailStyle[
                                                                    "exam-detail-label"
                                                                ]
                                                            }
                                                        >
                                                            <Card
                                                                hoverable
                                                                className="option-card"
                                                            >
                                                                <Radio
                                                                    className="hiii2"
                                                                    value="b"
                                                                    id="select-b"
                                                                >
                                                                    {question.options &&
                                                                        question
                                                                            .options
                                                                            .b}
                                                                </Radio>
                                                            </Card>
                                                        </label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={24}
                                                        md={21}
                                                        lg={20}
                                                        span={20}
                                                    >
                                                        <label
                                                            htmlFor="select-c"
                                                            className={
                                                                examDetailStyle[
                                                                    "exam-detail-label"
                                                                ]
                                                            }
                                                        >
                                                            <Card
                                                                hoverable
                                                                className="option-card"
                                                            >
                                                                <Radio
                                                                    className="hiii2"
                                                                    value="c"
                                                                    id="select-c"
                                                                >
                                                                    {question.options &&
                                                                        question
                                                                            .options
                                                                            .c}
                                                                </Radio>
                                                            </Card>
                                                        </label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xs={24}
                                                        md={21}
                                                        lg={20}
                                                        span={20}
                                                    >
                                                        <label
                                                            htmlFor="select-d"
                                                            className={
                                                                examDetailStyle[
                                                                    "exam-detail-label"
                                                                ]
                                                            }
                                                        >
                                                            <Card
                                                                hoverable
                                                                className="option-card"
                                                            >
                                                                <Radio
                                                                    className="hiii2"
                                                                    value="d"
                                                                    id="select-d"
                                                                >
                                                                    {question.options &&
                                                                        question
                                                                            .options
                                                                            .d}
                                                                </Radio>
                                                            </Card>
                                                        </label>
                                                    </Col>
                                                </Row>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                            )}
                        />
                        <Divider />
                        <Row justify="space-between">
                            <Col span={8}>
                                <Popconfirm
                                    title="Submitting will end the test and save your work. Are you sure about this?"
                                    onConfirm={onSectionSubmit}
                                    onCancel={onSectionCancel}
                                    okText="Yes"
                                >
                                    <Button
                                        onClick={() => {
                                            dispatch(
                                                allActions.customActions.examSaved(
                                                    true
                                                )
                                            );

                                            setTimeout(
                                                () =>
                                                    dispatch(
                                                        allActions.customActions.examSaved(
                                                            false
                                                        )
                                                    ),
                                                700
                                            );
                                        }}
                                        type="primary"
                                    >
                                        Submit
                                    </Button>
                                </Popconfirm>
                            </Col>
                            <Col span={8} offset={8}>
                                <Row gutter={32} justify="center">
                                    <Col span={5}>
                                        <LeftOutlined
                                            className="hover-icon-next test-submit-delete"
                                            onClick={() =>
                                                selectedQuestion > 1 &&
                                                dispatch(
                                                    allActions.customActions.selectedQuestion(
                                                        selectedQuestion - 1
                                                    )
                                                )
                                            }
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <RightOutlined
                                            className="hover-icon-next test-submit-delete"
                                            onClick={() =>
                                                selectedQuestion <
                                                    Object.values(questions)
                                                        .length &&
                                                dispatch(
                                                    allActions.customActions.selectedQuestion(
                                                        selectedQuestion + 1
                                                    )
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Card>
            </Form>
        </>
    );
};

export default ExamDetail;
