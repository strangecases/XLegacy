import {
    Form,
    Card,
    Button,
    Radio,
    Space,
    Divider,
    Row,
    Input,
    Col,
    Tooltip,
} from "antd";
import {
    CloseCircleFilled,
    RightOutlined,
    LeftOutlined,
    CheckCircleFilled,
} from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useRouter } from "next/router";
import FormItem from "../formitems/FormItem";
import { questionSchema } from "../../yupUtil";
import allActions from "../../store/actions";
import DeleteSectionForm from "../modal/modalSection/DeleteSectionForm";
import EditSectionForm from "../modal/modalSection/EditSectionForm";
import FormOption from "../formitems/FormOption";
import SegmentedSections from "./SegmentedSections";
import questionDetailStyle from "../../styles/modules/componentStyles/QuestionDetails.module.css";

const QuestionDetail = () => {
    const { selectedQuestion, selectedSectionId } = useSelector(
        (state) => state.custom
    );
    const { tests } = useSelector((state) => state);
    const { questions } = useSelector((state) => state);

    const router = useRouter();
    const { id, testId } = router.query;

    const dispatch = useDispatch();

    let section;
    if (testId && tests[testId]) {
        section = tests[testId].sectionData.find((x) => {
            return x.sectionId === selectedSectionId;
        });
    }

    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        setError,
    } = useForm({
        mode: "onBlur",
        defaultValues: {},
        resolver: yupResolver(questionSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
        dispatch(allActions.questionActions.editQuestion(data));
    };

    useEffect(() => {
        if (
            questions[selectedQuestion] &&
            questions[selectedQuestion].options &&
            questions[selectedQuestion].answer &&
            questions[selectedQuestion].question
        ) {
            setError("question", "");
            setError("answer", "");
            setError("options", "");

            setValue("options", {
                a: questions[selectedQuestion].options
                    ? questions[selectedQuestion].options.a
                    : "",
                b: questions[selectedQuestion].options
                    ? questions[selectedQuestion].options.b
                    : "",
                c: questions[selectedQuestion].options
                    ? questions[selectedQuestion].options.c
                    : "",
                d: questions[selectedQuestion].options
                    ? questions[selectedQuestion].options.d
                    : "",
            });

            setValue("answer", questions[selectedQuestion].answer);
            setValue("question", questions[selectedQuestion].question);

            console.log(questions[selectedQuestion]);
        } else {
            setValue("options", {
                a: "",
                b: "",
                c: "",
                d: "",
            });
            setValue("answer", "");
            setValue("question", "");
        }
    }, [selectedQuestion, questions]);

    useEffect(() => {
        const elements = document.getElementsByClassName("hiii");
        for (let i = 0; i < elements.length; i += 1) {
            elements[i].addEventListener("change", handleSubmit(onSubmit));
            console.log("gggg");
        }

        return () => {
            for (let i = 0; i < elements.length; i += 1) {
                elements[i].removeEventListener(
                    "change",
                    handleSubmit(onSubmit)
                );
            }
        };

        // const element = document.getElementById("hii");
        // element.addEventListener("change", (e) => {
        //     if (e.target && e.target.matches("input[type='radio']")) {
        //         handleSubmit(onSubmit);
        //     }
        // });
        // return () => {
        //     element.removeEventListener("change", handleSubmit(onSubmit));
        // };
    }, []);

    const onAddQuestion = () => {
        const questionLength = Object.values(questions).length;
        console.log(questions[selectedQuestion]);
        if (questionLength >= 25) {
            console.log("cant add more than 25 questions");
        } else {
            dispatch(
                allActions.questionActions.editQuestion({
                    questionNo: questionLength + 1,
                })
            );
            dispatch(
                allActions.customActions.selectedQuestion(questionLength + 1)
            );
        }
    };

    const onDeleteQuestion = async () => {
        dispatch(allActions.questionActions.deleteQuestion(selectedQuestion));
        let questionList = Object.values(questions).slice(selectedQuestion);
        if (Object.values(questions).length >= 1) {
            console.log("1", questionList);
            questionList = questionList.map((x) => {
                const d = { ...x };
                if (d.questionNo === 1) {
                    d.questionNo = 1;
                } else {
                    d.questionNo -= 1;
                }
                return d;
            });
            console.log("2", questionList);
            dispatch(allActions.questionActions.upOnDeletion(questionList));
            dispatch(
                allActions.questionActions.deleteQuestion(
                    Object.values(questions).length
                )
            );
            console.log(questions);
            dispatch(
                allActions.customActions.selectedQuestion(
                    selectedQuestion === 1
                        ? selectedQuestion
                        : selectedQuestion - 1
                )
            );
            console.log(selectedQuestion);
        }
    };

    const onSave = async (publish) => {
        if (!publish) {
            dispatch(
                allActions.questionActions.onSectionClick({
                    testId,
                    save: true,
                })
            );
        } else {
            dispatch(
                allActions.questionActions.onSectionClick({
                    testId,
                    publish: true,
                    id,
                })
            );
        }
    };

    const showPopConfirm = () => {
        dispatch(allActions.modalActions.visibleDeleteSectionYes());
    };

    console.log(errors);

    return (
        <>
            <SegmentedSections />

            <Form
                onFinish={handleSubmit(onSubmit)}
                className={questionDetailStyle["question-detail-form"]}
            >
                <Card
                    className={`scroll-bar-none ${
                        questionDetailStyle["question-detail-card"]
                    } ${
                        !errors?.question?.message
                            ? questionDetailStyle[
                                  "question-detail-card-no-error"
                              ]
                            : questionDetailStyle["question-detail-card-error"]
                    }`}
                >
                    <Row
                        gutter={16}
                        className={questionDetailStyle["question-detail-row"]}
                    >
                        <Col xs={6} sm={4} lg={3} span={3}>
                            <Controller
                                value={setValue("questionNo", selectedQuestion)}
                                control={control}
                                name="questionNo"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className={
                                            questionDetailStyle[
                                                "question-detail-center"
                                            ]
                                        }
                                        readOnly
                                    />
                                )}
                            />
                        </Col>
                        <Col xs={13} sm={16} lg={17} span={17}>
                            <FormItem
                                control={control}
                                errors={errors}
                                name="question"
                                placeholder="Enter Question"
                                type="text"
                            />
                        </Col>
                        <Col xs={5} sm={4} md={4} lg={3} span={3}>
                            <Row
                                gutter={{
                                    xs: 32,
                                    sm: 16,
                                    md: 28,
                                    lg: 32,
                                }}
                            >
                                <Col
                                    xs={8}
                                    sm={8}
                                    md={6}
                                    lg={8}
                                    xl={5}
                                    span={8}
                                >
                                    <Tooltip
                                        title="Save Question"
                                        placement="bottom"
                                        color="#71a832"
                                    >
                                        <CheckCircleFilled
                                            onClick={handleSubmit(onSubmit)}
                                            className={`hover-icon-submit test-submit-delete ${questionDetailStyle["question-detail-tooltip"]}`}
                                        />
                                    </Tooltip>
                                </Col>
                                <Col
                                    xs={8}
                                    sm={8}
                                    md={6}
                                    lg={8}
                                    xl={5}
                                    span={8}
                                >
                                    <Tooltip
                                        title="Delete Question"
                                        placement="bottom"
                                        color="#f20707"
                                    >
                                        <CloseCircleFilled
                                            onClick={onDeleteQuestion}
                                            className={`hover-icon-delete test-submit-delete ${questionDetailStyle["question-detail-tooltip"]}`}
                                        />
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Card
                    className={
                        questionDetailStyle["question-detail-inner-card"]
                    }
                >
                    <Controller
                        defaultValue="c"
                        control={control}
                        name="answer"
                        render={({ field }) => (
                            <Radio.Group {...field} id="hii">
                                <Row>
                                    <Col
                                        xs={24}
                                        sm={24}
                                        md={16}
                                        lg={16}
                                        span={16}
                                    >
                                        <Space
                                            direction="vertical"
                                            className={
                                                questionDetailStyle[
                                                    "question-detail-space"
                                                ]
                                            }
                                        >
                                            <Card
                                                className={`test-card ${
                                                    questionDetailStyle[
                                                        "question-detail-option-card"
                                                    ]
                                                } ${
                                                    !errors?.options?.a
                                                        ? questionDetailStyle[
                                                              "question-detail-option-card-no-error"
                                                          ]
                                                        : questionDetailStyle[
                                                              "question-detail-option-card-error"
                                                          ]
                                                }`}
                                            >
                                                <Row gutter={16}>
                                                    <Col
                                                        xs={2}
                                                        lg={2}
                                                        xl={1}
                                                        span={2}
                                                    >
                                                        <Radio
                                                            className={`hiii ${questionDetailStyle["question-detail-radio"]}`}
                                                            value="a"
                                                        />
                                                    </Col>
                                                    <Col
                                                        xs={15}
                                                        md={18}
                                                        lg={19}
                                                        offset={1}
                                                    >
                                                        <FormOption
                                                            control={control}
                                                            errors={errors}
                                                            name="options.a"
                                                            option="a"
                                                            placeholder="Enter option"
                                                            type="text"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card>

                                            <Card
                                                className={`test-card ${
                                                    questionDetailStyle[
                                                        "question-detail-option-card"
                                                    ]
                                                } ${
                                                    !errors?.options?.b
                                                        ? questionDetailStyle[
                                                              "question-detail-option-card-no-error"
                                                          ]
                                                        : questionDetailStyle[
                                                              "question-detail-option-card-error"
                                                          ]
                                                }`}
                                            >
                                                <Row gutter={16}>
                                                    <Col
                                                        xs={2}
                                                        lg={2}
                                                        xl={1}
                                                        span={2}
                                                    >
                                                        <Radio
                                                            value="b"
                                                            className={`hiii ${questionDetailStyle["question-detail-radio"]}`}
                                                        />
                                                    </Col>
                                                    <Col
                                                        xs={16}
                                                        md={18}
                                                        lg={19}
                                                        offset={1}
                                                    >
                                                        <FormOption
                                                            control={control}
                                                            errors={errors}
                                                            name="options.b"
                                                            option="b"
                                                            placeholder="Enter option"
                                                            type="text"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card>
                                            <Card
                                                className={`test-card ${
                                                    questionDetailStyle[
                                                        "question-detail-option-card"
                                                    ]
                                                } ${
                                                    !errors?.options?.c
                                                        ? questionDetailStyle[
                                                              "question-detail-option-card-no-error"
                                                          ]
                                                        : questionDetailStyle[
                                                              "question-detail-option-card-error"
                                                          ]
                                                }`}
                                            >
                                                <Row gutter={16}>
                                                    <Col
                                                        xs={2}
                                                        lg={2}
                                                        xl={1}
                                                        span={2}
                                                    >
                                                        <Radio
                                                            className={`hiii ${questionDetailStyle["question-detail-radio"]}`}
                                                            value="c"
                                                        />
                                                    </Col>
                                                    <Col
                                                        xs={16}
                                                        md={18}
                                                        lg={19}
                                                        offset={1}
                                                    >
                                                        <FormOption
                                                            control={control}
                                                            errors={errors}
                                                            name="options.c"
                                                            option="c"
                                                            placeholder="Enter option"
                                                            type="text"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card>
                                            <Card
                                                className={`test-card ${
                                                    questionDetailStyle[
                                                        "question-detail-option-card"
                                                    ]
                                                } ${
                                                    !errors?.options?.d
                                                        ? questionDetailStyle[
                                                              "question-detail-option-card-no-error"
                                                          ]
                                                        : questionDetailStyle[
                                                              "question-detail-option-card-error"
                                                          ]
                                                }`}
                                            >
                                                <Row gutter={16}>
                                                    <Col
                                                        xs={2}
                                                        lg={2}
                                                        xl={1}
                                                        span={2}
                                                    >
                                                        <Radio
                                                            className={`hiii ${questionDetailStyle["question-detail-radio"]}`}
                                                            value="d"
                                                        />
                                                    </Col>
                                                    <Col
                                                        xs={16}
                                                        md={18}
                                                        lg={19}
                                                        offset={1}
                                                    >
                                                        <FormOption
                                                            control={control}
                                                            errors={errors}
                                                            name="options.d"
                                                            option="d"
                                                            placeholder="Enter option"
                                                            type="text"
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Space>
                                    </Col>
                                </Row>
                            </Radio.Group>
                        )}
                    />

                    <Divider />
                    <Row
                        className={
                            questionDetailStyle["question-detail-divider-row"]
                        }
                    >
                        <Col span={8}>
                            <Button
                                danger
                                onClick={handleSubmit(onAddQuestion)}
                            >
                                Add Question
                            </Button>
                        </Col>
                        <Col span={8} offset={8}>
                            <Row gutter={32} justify="center">
                                <Col span={5}>
                                    <LeftOutlined
                                        className={`hover-icon-next test-submit-delete ${
                                            selectedQuestion === 1 &&
                                            questionDetailStyle[
                                                "question-detail-left-outlined-display"
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
                                            questionDetailStyle[
                                                "question-detail-left-outlined-display"
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
            </Form>

            <Card
                bordered={false}
                className={questionDetailStyle["question-detail-save-card"]}
            >
                <Row
                    gutter={[8, 16]}
                    className={
                        questionDetailStyle["question-detail-save-card-row"]
                    }
                >
                    <Col
                        xs={{ span: 24, offset: 1 }}
                        sm={{ span: 9, offset: 0 }}
                        md={{ span: 10, offset: 0 }}
                        lg={{ span: 8, offset: 1 }}
                        xl={{ span: 8, offset: 1 }}
                    >
                        <Space size={[16, 12]} wrap>
                            <Button
                                type="primary"
                                onClick={() => onSave(false)}
                            >
                                save
                            </Button>
                            {tests && !tests[testId]?.isPublished && (
                                <Button onClick={() => onSave(true)}>
                                    publish
                                </Button>
                            )}
                        </Space>
                    </Col>

                    <Col
                        xs={{ span: 24, offset: 1 }}
                        sm={{ span: 14, offset: 1 }}
                        md={{ span: 14, offset: 0 }}
                        lg={{ span: 12, offset: 3 }}
                        xl={{ span: 10, offset: 5 }}
                    >
                        <Space size={[16, 12]} wrap>
                            {section && <EditSectionForm section={section} />}
                            <Button onClick={showPopConfirm} danger>
                                Delete Section
                            </Button>
                            <DeleteSectionForm />
                        </Space>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default QuestionDetail;
