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
    Skeleton,
    Empty,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { EDIT_ANSWER } from "../../store/types";
import allActions from "../../store/actions";
import SegmentedSections from "./SegmentedSections";
import examDetailStyle from "../../styles/modules/componentStyles/ExamDetails.module.css";

const ExamDetail = () => {
    const { questions, answers, load, custom } = useSelector((state) => state);
    const { questionsLoading } = load;
    const { selectedQuestion, isQuestionsEmpty } = custom;

    const router = useRouter();
    const { id, testId } = router.query;

    const dispatch = useDispatch();
    // const grew = useRef(0);
    // useEffect(() => {
    //     grew.current += 1;
    // });

    const { handleSubmit, control, setValue } = useForm({
        mode: "onBlur",
        defaultValues: {},
    });

    const onSubmit = useCallback(
        (data) => {
            // console.log(data);
            // setValue("answer", data?.answer);
            dispatch({ type: EDIT_ANSWER, payload: data });
        },
        [dispatch]
    );

    const onSectionSubmit = async () => {
        // console.log("hi");
        dispatch(allActions.customActions.examSaved(true));
        dispatch(allActions.loadingActions.examSavedLoading(true));
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
        if (answers[selectedQuestion]) {
            setValue("answer", answers[selectedQuestion]);
        } else {
            setValue("answer", "");
        }
        setValue("questionNo", selectedQuestion);
    }, [selectedQuestion, answers, setValue]);

    useEffect(() => {
        let elements = [];

        if (!questionsLoading) {
            elements = document.getElementsByClassName("hiii2");
            for (let i = 0; i < elements.length; i += 1) {
                elements[i].addEventListener("change", handleSubmit(onSubmit), {
                    capture: true,
                });
            }
        }

        return () => {
            for (let i = 0; i < elements.length; i += 1) {
                elements[i].removeEventListener(
                    "change",
                    handleSubmit(onSubmit),
                    { capture: true }
                );
            }
        };
    }, [questionsLoading, handleSubmit, onSubmit]);

    return (
        <>
            <SegmentedSections />
            <Form
                onFinish={handleSubmit(onSubmit)}
                className={examDetailStyle["exam-detail-form-padding"]}
            >
                <Card>
                    <Skeleton
                        className={examDetailStyle["exam-detail-form-padding"]}
                        active
                        loading={questionsLoading}
                        paragraph={{ rows: 0 }}
                        title={{ width: "100%" }}
                    />
                    {!questionsLoading && (
                        <Row gutter={{ xs: 10, sm: 16 }}>
                            <Col xs={5} sm={4} md={5} lg={3} span={3}>
                                <Controller
                                    className={
                                        examDetailStyle[
                                            "exam-detail-input-position"
                                        ]
                                    }
                                    // value={setValue(
                                    //     "questionNo",
                                    //     selectedQuestion
                                    // )}
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
                            <Col xs={19} sm={20} md={19} lg={21} span={21}>
                                <Card
                                    type="inner"
                                    bordered={false}
                                    className="exam-detail-inner-card"
                                >
                                    {questions[selectedQuestion]?.question ||
                                        "No Data"}
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Card>
                <Card>
                    <Skeleton
                        className={examDetailStyle["exam-detail-form-padding"]}
                        active
                        loading={questionsLoading}
                        paragraph={{ rows: 11 }}
                    />
                    {!questionsLoading && (
                        <Card
                            type="inner"
                            bordered={false}
                            className="inner-card-padding"
                        >
                            {!isQuestionsEmpty ? (
                                <Controller
                                    defaultValue="c"
                                    control={control}
                                    name="answer"
                                    render={({ field }) => (
                                        <Radio.Group
                                            {...field}
                                            className={
                                                examDetailStyle[
                                                    "exam-detail-radio-group"
                                                ]
                                            }
                                        >
                                            <Row>
                                                <Col span={24}>
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
                                                                sm={18}
                                                                md={20}
                                                                lg={15}
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
                                                                            className={`hiii2 ${examDetailStyle["exam-detail-radio-label"]}`}
                                                                            value="a"
                                                                            id="select-a"
                                                                            disabled={
                                                                                !questions[
                                                                                    selectedQuestion
                                                                                ]
                                                                                    ?.question
                                                                            }
                                                                        >
                                                                            {
                                                                                questions[
                                                                                    selectedQuestion
                                                                                ]
                                                                                    ?.options
                                                                                    ?.a
                                                                            }
                                                                        </Radio>
                                                                    </Card>
                                                                </label>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col
                                                                xs={24}
                                                                sm={18}
                                                                md={20}
                                                                lg={15}
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
                                                                            className={`hiii2 ${examDetailStyle["exam-detail-radio-label"]}`}
                                                                            value="b"
                                                                            id="select-b"
                                                                            disabled={
                                                                                !questions[
                                                                                    selectedQuestion
                                                                                ]
                                                                                    ?.question
                                                                            }
                                                                        >
                                                                            {
                                                                                questions[
                                                                                    selectedQuestion
                                                                                ]
                                                                                    ?.options
                                                                                    ?.b
                                                                            }
                                                                        </Radio>
                                                                    </Card>
                                                                </label>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col
                                                                xs={24}
                                                                sm={18}
                                                                md={20}
                                                                lg={15}
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
                                                                            className={`hiii2 ${examDetailStyle["exam-detail-radio-label"]}`}
                                                                            value="c"
                                                                            id="select-c"
                                                                            disabled={
                                                                                !questions[
                                                                                    selectedQuestion
                                                                                ]
                                                                                    ?.question
                                                                            }
                                                                        >
                                                                            {
                                                                                questions[
                                                                                    selectedQuestion
                                                                                ]
                                                                                    ?.options
                                                                                    ?.c
                                                                            }
                                                                        </Radio>
                                                                    </Card>
                                                                </label>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col
                                                                xs={24}
                                                                sm={18}
                                                                md={20}
                                                                lg={15}
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
                                                                            className={`hiii2 ${examDetailStyle["exam-detail-radio-label"]}`}
                                                                            value="d"
                                                                            id="select-d"
                                                                            disabled={
                                                                                !questions[
                                                                                    selectedQuestion
                                                                                ]
                                                                                    ?.question
                                                                            }
                                                                        >
                                                                            {
                                                                                questions[
                                                                                    selectedQuestion
                                                                                ]
                                                                                    ?.options
                                                                                    ?.d
                                                                            }
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
                            ) : (
                                <Empty />
                            )}
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
                                                className={`hover-icon-next test-submit-delete ${
                                                    selectedQuestion === 1 &&
                                                    examDetailStyle[
                                                        "exam-detail-outlined-display"
                                                    ]
                                                }`}
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
                                                className={`hover-icon-next test-submit-delete ${
                                                    selectedQuestion ===
                                                        Object.values(questions)
                                                            .length &&
                                                    examDetailStyle[
                                                        "exam-detail-outlined-display"
                                                    ]
                                                }`}
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
                    )}
                </Card>
            </Form>
        </>
    );
};

export default ExamDetail;
