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
    Skeleton,
    Badge,
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
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import FormItem from "../formitems/FormItem";
import { questionSchema } from "../../yupUtil";
import allActions from "../../store/actions";
import DeleteSectionForm from "../modal/modalSection/DeleteSectionForm";
import EditSectionForm from "../modal/modalSection/EditSectionForm";
// import FormOption from "../formitems/FormOption";
import SegmentedSections from "./SegmentedSections";
import questionDetailStyle from "../../styles/modules/componentStyles/QuestionDetails.module.css";
import FormOptionUnderline from "../formitems/FormOptionUnderline";

const QuestionDetail = () => {
    const [sectionLoading, setSectionLoading] = useState(true);

    // const grew = useRef(0);

    const { tests, questions, load, custom } = useSelector((state) => state);
    const { questionSaveLoading, questionsLoading } = load;
    const {
        selectedQuestion,
        selectedSectionNo,
        isQuestionsFull,
        saveSection,
    } = custom;

    const router = useRouter();
    const { id, testId } = router.query;

    const dispatch = useDispatch();

    // let section;
    // if (testId && tests[testId]) {
    //     section = tests[testId].sectionData.find((x) => {
    //         return x.sectionId === selectedSectionId;
    //     });
    // }

    const {
        handleSubmit,
        formState: { errors },
        control,

        setValue,
        setError,
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            // question:
            //     questions[selectedQuestion] &&
            //     questions[selectedQuestion]?.question,
            // options: {
            //     a:
            //         questions[selectedQuestion] &&
            //         questions[selectedQuestion]?.options?.a,
            //     b:
            //         questions[selectedQuestion] &&
            //         questions[selectedQuestion]?.options?.b,
            //     c:
            //         questions[selectedQuestion] &&
            //         questions[selectedQuestion]?.options?.c,
            //     d:
            //         questions[selectedQuestion] &&
            //         questions[selectedQuestion]?.options?.d,
            // },
        },
        resolver: yupResolver(questionSchema),
    });

    const onSubmit = useCallback(
        (data) => {
            // console.log(data);
            dispatch(
                allActions.questionActions.editQuestion({ formValues: data })
            );
            dispatch(allActions.customActions.saveSection(false));
            if (data.questionNo === 1 && data.question && data.answer) {
                dispatch(allActions.customActions.isQuestionsEmpty(false));
            }
        },
        [dispatch]
    );

    const onError = (error) => {
        // console.log(error);
        if (error.answer && !error.question && !error.options) {
            toast.error("You should select one option before saving", {
                autoClose: 2200,
                hideProgressBar: true,
            });
        }
    };

    // useEffect(() => {
    //     grew.current += 1;
    // });

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

            setValue(
                "options",
                {
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
                },
                { shouldDirty: false }
            );

            setValue("answer", questions[selectedQuestion].answer, {
                shouldDirty: false,
            });
            setValue("question", questions[selectedQuestion].question, {
                shouldDirty: false,
            });
            setValue("questionNo", selectedQuestion);
        } else {
            setValue(
                "options",
                {
                    a: "",
                    b: "",
                    c: "",
                    d: "",
                },
                { shouldDirty: false }
            );
            setValue("answer", "", { shouldDirty: false });
            setValue("question", "", { shouldDirty: false });
            setValue("questionNo", selectedQuestion);
        }
    }, [selectedQuestion, questions, setValue, setError]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSectionLoading(questionsLoading);
        }, 200);

        return () => {
            clearTimeout(timeout);
        };
    }, [questionsLoading]);

    useEffect(() => {
        let elements = [];
        if (!sectionLoading) {
            elements = document.getElementsByClassName("hiii");
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
    }, [sectionLoading, handleSubmit, onSubmit]);

    const onAddQuestion = (data) => {
        const questionsArray = Object.values(questions);
        const questionsLength = questionsArray.length;
        // console.log(questions[selectedQuestion]);
        // console.log(questionsLength);

        if (
            questionsLength >= 25 &&
            questionsArray[questionsLength - 1].question
        ) {
            // console.log("cant add more than 25 questions");
            dispatch(allActions.customActions.isQuestionsFull(true));
            toast.error("cant add more than 25 questions", {
                autoClose: 2200,
                hideProgressBar: true,
            });
        }

        if (
            questionsArray[questionsLength - 1].question &&
            questionsArray[questionsLength - 1].answer &&
            questionsArray[questionsLength - 1].options &&
            questionsLength <= 25
        ) {
            // console.log("1");
            if (questionsLength <= 24) {
                dispatch(
                    allActions.questionActions.editQuestion({
                        formValues: {
                            questionNo: questionsLength + 1,
                        },
                        noToast: true,
                    })
                );
                dispatch(
                    allActions.customActions.selectedQuestion(
                        questionsLength + 1
                    )
                );
            }
            dispatch(allActions.customActions.saveSection(false));
        } else if (
            !questionsArray[questionsLength - 1].question &&
            !questionsArray[questionsLength - 1].answer &&
            !questionsArray[questionsLength - 1].options &&
            !errors?.question &&
            !errors?.options &&
            !errors?.answer &&
            questionsLength <= 25
        ) {
            // console.log("2");
            dispatch(
                allActions.questionActions.editQuestion({ formValues: data })
            );

            if (questionsLength <= 24) {
                dispatch(
                    allActions.questionActions.editQuestion({
                        formValues: {
                            questionNo: questionsLength + 1,
                        },
                        noToast: true,
                    })
                );

                dispatch(
                    allActions.customActions.selectedQuestion(
                        questionsLength + 1
                    )
                );
            }
            dispatch(allActions.customActions.saveSection(false));
            if (data.questionNo === 1 && data.question && data.answer) {
                dispatch(allActions.customActions.isQuestionsEmpty(false));
            }
        } else {
            // console.log("3");
            dispatch(
                allActions.customActions.selectedQuestion(questionsLength)
            );
        }
    };

    const onDeleteQuestion = async () => {
        dispatch(allActions.questionActions.deleteQuestion(selectedQuestion));
        let questionList = Object.values(questions).slice(selectedQuestion);
        // console.log(Object.values(questions));

        const questionsLength = Object.values(questions).length;
        // console.log(questionsLength);

        if (Object.values(questions).length === 1) {
            dispatch(
                allActions.questionActions.upOnDeletion([{ questionNo: 1 }])
            );
            dispatch(allActions.customActions.isQuestionsEmpty(true));
            dispatch(allActions.customActions.saveSection(false));
        } else if (Object.values(questions).length > 1) {
            if (questionsLength === 25) {
                dispatch(allActions.customActions.isQuestionsFull(false));
            }
            // console.log("1", questionList);
            questionList = questionList.map((x) => {
                const d = { ...x };

                if (d.questionNo === 1) {
                    d.questionNo = 1;
                } else {
                    d.questionNo -= 1;
                }
                return d;
            });
            // console.log("2", questionList);
            dispatch(allActions.questionActions.upOnDeletion(questionList));
            dispatch(
                allActions.questionActions.deleteQuestion(
                    Object.values(questions).length
                )
            );

            // console.log(questions);
            dispatch(
                allActions.customActions.selectedQuestion(
                    selectedQuestion === 1
                        ? selectedQuestion
                        : selectedQuestion - 1
                )
            );
            dispatch(allActions.customActions.saveSection(false));
            // console.log(selectedQuestion);
        }
    };

    const onSave = async (data, publish) => {
        if (
            questions[selectedQuestion] &&
            !questions[selectedQuestion]?.question &&
            !questions[selectedQuestion]?.answer &&
            !questions[selectedQuestion]?.options &&
            !errors?.question &&
            !errors?.options &&
            !errors?.answer &&
            data
        ) {
            dispatch(
                allActions.questionActions.editQuestion({
                    formValues: data,
                    noToast: true,
                })
            );
            if (data.questionNo === 1 && data.question && data.answer) {
                // console.log(data);
                dispatch(allActions.customActions.isQuestionsEmpty(false));
            }
            // console.log("x");
        }
        if (!publish) {
            dispatch(
                allActions.questionActions.onSectionClick({
                    testId,
                    save: true,
                })
            );
            dispatch(allActions.customActions.saveSection(true));
        } else {
            dispatch(
                allActions.questionActions.onSectionClick({
                    testId,
                    publish: true,
                    id,
                })
            );
            dispatch(allActions.customActions.saveSection(true));
        }
    };

    const onSaveError = async (error, publish) => {
        if (error.answer && !error.question && !error.options) {
            toast.error("You should select one option before saving", {
                autoClose: 2200,
                hideProgressBar: true,
            });
        } else {
            await onSave(null, publish);
        }
    };

    const showPopConfirm = () => {
        dispatch(allActions.modalActions.visibleDeleteSectionYes());
    };

    return (
        <>
            <SegmentedSections />
            {/* {console.log(errors)} */}

            <Form
                onFinish={handleSubmit(onSubmit, onError)}
                className={questionDetailStyle["question-detail-form"]}
            >
                <Card
                    className={`${
                        questionDetailStyle["question-detail-card"]
                    } ${
                        !errors?.question?.message
                            ? questionDetailStyle[
                                  "question-detail-card-no-error"
                              ]
                            : questionDetailStyle["question-detail-card-error"]
                    }`}
                >
                    <Skeleton
                        active
                        loading={sectionLoading}
                        paragraph={{ rows: 1 }}
                        title={{ width: "100%" }}
                    />
                    {!sectionLoading && (
                        <>
                            <Row
                                gutter={{ xs: 10, sm: 16 }}
                                className={
                                    questionDetailStyle["question-detail-row"]
                                }
                            >
                                <Col xs={5} sm={4} lg={3} span={3}>
                                    <Controller
                                        // value={setValue(
                                        //     "questionNo",
                                        //     selectedQuestion,
                                        //     { shouldDirty: false }
                                        // )}
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
                                <Col xs={19} sm={16} lg={18} span={17}>
                                    <FormItem
                                        control={control}
                                        errors={errors}
                                        name="question"
                                        placeholder="Enter Question"
                                        type="text"
                                    />
                                </Col>
                                <Col xs={0} sm={4} md={4} lg={3} span={3}>
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
                                                overlayClassName="tooltip-mobile-display-none"
                                            >
                                                <CheckCircleFilled
                                                    onClick={handleSubmit(
                                                        onSubmit,
                                                        onError
                                                    )}
                                                    className={`test-submit-delete test-submit ${questionDetailStyle["question-detail-tooltip"]} 
                                               
                                                `}
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
                                                color="#ec5e5e"
                                                overlayClassName="tooltip-mobile-display-none"
                                            >
                                                <CloseCircleFilled
                                                    onClick={onDeleteQuestion}
                                                    className={`test-submit-delete test-delete ${questionDetailStyle["question-detail-tooltip"]}`}
                                                />
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row
                                gutter={8}
                                className={
                                    questionDetailStyle[
                                        "small-screen-delete-save"
                                    ]
                                }
                            >
                                <Col xs={12} sm={0} offset={0}>
                                    <Button
                                        className={
                                            questionDetailStyle[
                                                "question-detail-button"
                                            ]
                                        }
                                        type="dashed"
                                        onClick={handleSubmit(
                                            onSubmit,
                                            onError
                                        )}
                                    >
                                        Save question
                                    </Button>
                                </Col>

                                <Col xs={12} sm={0}>
                                    <Button
                                        className={
                                            questionDetailStyle[
                                                "question-detail-button"
                                            ]
                                        }
                                        onClick={onDeleteQuestion}
                                        danger
                                    >
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Card>

                <Card
                    className={
                        questionDetailStyle["question-detail-inner-card"]
                    }
                >
                    <Skeleton
                        active
                        loading={sectionLoading}
                        paragraph={{ rows: 11 }}
                    />
                    {!sectionLoading && (
                        <>
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
                                                md={19}
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
                                                                xs={18}
                                                                md={18}
                                                                lg={19}
                                                                offset={1}
                                                            >
                                                                <FormOptionUnderline
                                                                    control={
                                                                        control
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
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
                                                                xs={18}
                                                                md={18}
                                                                lg={19}
                                                                offset={1}
                                                            >
                                                                <FormOptionUnderline
                                                                    control={
                                                                        control
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
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
                                                                xs={18}
                                                                md={18}
                                                                lg={19}
                                                                offset={1}
                                                            >
                                                                <FormOptionUnderline
                                                                    control={
                                                                        control
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
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
                                                                xs={18}
                                                                md={18}
                                                                lg={19}
                                                                offset={1}
                                                            >
                                                                <FormOptionUnderline
                                                                    control={
                                                                        control
                                                                    }
                                                                    errors={
                                                                        errors
                                                                    }
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
                                    questionDetailStyle[
                                        "question-detail-divider-row"
                                    ]
                                }
                            >
                                <Col sm={16} xs={18}>
                                    <Button
                                        danger
                                        onClick={handleSubmit(
                                            onAddQuestion,
                                            onError
                                        )}
                                        disabled={isQuestionsFull}
                                    >
                                        Add Question
                                    </Button>
                                    <Link
                                        href={`/schools/${id}/tests/${testId}/view-sections`}
                                    >
                                        <Button
                                            className={
                                                questionDetailStyle[
                                                    "question-detail-view"
                                                ]
                                            }
                                            type="link"
                                            disabled={!saveSection}
                                        >
                                            view
                                        </Button>
                                    </Link>
                                </Col>
                                <Col sm={8} xs={6}>
                                    <Row gutter={32} justify="center">
                                        <Col span={5}>
                                            <LeftOutlined
                                                className={`hover-icon-next test-submit-delete ${
                                                    questionDetailStyle[
                                                        "question-detail-tooltip"
                                                    ]
                                                } ${
                                                    selectedQuestion === 1 &&
                                                    questionDetailStyle[
                                                        "question-detail-outlined-display"
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
                                                    questionDetailStyle[
                                                        "question-detail-tooltip"
                                                    ]
                                                } ${
                                                    selectedQuestion ===
                                                        Object.values(questions)
                                                            .length &&
                                                    questionDetailStyle[
                                                        "question-detail-outlined-display"
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
                        </>
                    )}
                </Card>
            </Form>

            <Card
                bordered={false}
                className={questionDetailStyle["question-detail-save-card"]}
            >
                {/* <Row
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
                                // onClick={() => onSave(false)}
                                onClick={handleSubmit(
                                    (data) => {
                                        onSave(data, false);
                                    },
                                    (error) => {
                                        onSaveError(error, false);
                                    }
                                )}
                                disabled={saveSection}
                            >
                                save
                            </Button>
                            {tests && !tests[testId]?.isPublished && (
                                <Button
                                    // onClick={() => onSave(true)}
                                    onClick={handleSubmit(
                                        (data) => {
                                            onSave(data, true);
                                        },
                                        (error) => {
                                            onSaveError(error, true);
                                        }
                                    )}
                                >
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
                </Row> */}
                <div
                    gutter={[8, 16]}
                    className={`${
                        questionDetailStyle["question-detail-save-card-div"]
                    } ${
                        tests &&
                        tests[testId]?.isPublished &&
                        questionDetailStyle[
                            "question-detail-save-card-div-no-publish"
                        ]
                    }`}
                >
                    <div
                        className={
                            questionDetailStyle["question-detail-div-one"]
                        }
                    >
                        <Badge
                            dot
                            status={saveSection ? "success" : "error"}
                            className={
                                questionDetailStyle[
                                    "question-detail-div-one-badge"
                                ]
                            }
                        >
                            <Button
                                type="primary"
                                // onClick={() => onSave(false)}

                                className={
                                    questionDetailStyle[
                                        "question-detail-div-one-button"
                                    ]
                                }
                                onClick={handleSubmit(
                                    (data) => {
                                        onSave(data, false);
                                    },
                                    (error) => {
                                        onSaveError(error, false);
                                    }
                                )}
                                disabled={saveSection}
                                danger
                                loading={questionSaveLoading}
                            >
                                save
                            </Button>
                        </Badge>
                    </div>
                    {tests && !tests[testId]?.isPublished && (
                        <div
                            className={
                                questionDetailStyle["question-detail-div-two"]
                            }
                        >
                            <Button
                                // onClick={() => onSave(true)}
                                style={{ width: "100%" }}
                                onClick={handleSubmit(
                                    (data) => {
                                        onSave(data, true);
                                    },
                                    (error) => {
                                        onSaveError(error, true);
                                    }
                                )}
                            >
                                publish
                            </Button>
                        </div>
                    )}

                    <div
                        className={
                            questionDetailStyle["question-detail-div-three"]
                        }
                    >
                        {/* sectionData-- */}
                        {testId && (
                            <EditSectionForm
                                section={
                                    tests[testId]?.sections[
                                        selectedSectionNo - 1
                                    ]
                                }
                            />
                        )}
                    </div>
                    <div
                        className={
                            questionDetailStyle["question-detail-div-four"]
                        }
                    >
                        <Button
                            // style={{ marginLeft: 8 }}
                            style={{ width: "100%" }}
                            onClick={showPopConfirm}
                            danger
                        >
                            Delete Section
                        </Button>
                        <DeleteSectionForm />
                    </div>
                </div>
            </Card>
        </>
    );
};

export default QuestionDetail;
