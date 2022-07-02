import { Tabs, Card, Row, Col, Pagination } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomLayout from "../../../../../../components/nav/CustomLayout";
import allActions from "../../../../../../store/actions";
import AdminRoute from "../../../../../../components/routes/AdminRoute";
import resultStyle from "../../../../../../styles/modules/pageStyles/Results.module.css";

const { TabPane } = Tabs;

const ExamIndex = () => {
    const [questionss, setQuestionss] = useState([]);
    const [pageNo, setPageNo] = useState("");

    const grew = useRef(0);
    const router = useRouter();
    const { id, testId, examIndex } = router.query;

    const { tests, questions } = useSelector((state) => state);
    const { examResult } = useSelector((state) => state.exam);
    const { selectedSectionId } = useSelector((state) => state.custom);

    const dispatch = useDispatch();

    useEffect(() => {
        if (id && testId && examIndex) {
            dispatch(allActions.testActions.fetchTest(id, testId));
            dispatch(allActions.examActions.examResult(id, testId, examIndex));
        }

        return () => {
            dispatch(allActions.customActions.selectedSectionId(undefined));
            dispatch(allActions.questionActions.emptyQuestions());
        };
    }, [id, testId, examIndex]);

    useEffect(() => {
        setQuestionss(Object.values(questions).slice(0, 1));
        setPageNo(1);
    }, [questions]);

    useEffect(() => {
        if (tests[testId]) {
            dispatch(
                allActions.customActions.selectedSectionId(
                    tests[testId].sectionData[0].sectionId
                )
            );
        }
    }, [tests, testId]);

    useEffect(() => {
        if (testId && selectedSectionId) {
            dispatch(allActions.questionActions.emptyQuestions());
            dispatch(
                allActions.questionActions.fetchQuestions(
                    testId,
                    selectedSectionId
                )
            );
            console.log("thrice");
        }
        // return () => {
        //     dispatch(allActions.questionActions.emptyQuestions());
        // };
    }, [testId, selectedSectionId]);

    useEffect(() => {
        grew.current += 1;
    });

    const onTabChange = async (active) => {
        dispatch(allActions.questionActions.emptyQuestions());
        dispatch(allActions.questionActions.fetchQuestions(testId, active));
    };

    const onPageChange = (page, pageSize) => {
        setPageNo(page);
        let x = Object.values(questions);
        x = x.slice((page - 1) * pageSize, page * pageSize);
        setQuestionss(x);
    };

    return (
        <AdminRoute>
            <Row gutter={[8, 32]} justify="center">
                <Col span={20}>
                    <Card
                        title={examResult?.studentName?.toUpperCase()}
                        size="small"
                        className={resultStyle["results-card"]}
                        hoverable
                        bordered={false}
                        extra={grew.current}
                    >
                        <div>
                            {`${examResult?.studentName
                                ?.charAt(0)
                                .toUpperCase()}${examResult?.studentName?.slice(
                                1
                            )} `}
                            has scored{" "}
                            <span className={resultStyle["results-marks-span"]}>
                                {examResult.marks}
                            </span>{" "}
                            {examResult.marks > 1 ? "marks" : "mark"} in test{" "}
                            <strong>
                                {tests[testId] && tests[testId].testTitle}
                            </strong>
                        </div>
                    </Card>
                </Col>
                <Col span={24}>
                    <Tabs
                        defaultActiveKey={
                            tests && tests[testId]?.sectionData[0]?.sectionId
                        }
                        type="card"
                        size="small"
                        tabPosition="top"
                        centered
                        onChange={onTabChange}
                    >
                        {tests &&
                            tests[testId]?.sectionData?.map(
                                (section, sectionInd) => {
                                    return (
                                        <TabPane
                                            tab={section.subject}
                                            key={section.sectionId}
                                        >
                                            <Row
                                                gutter={[16, 4]}
                                                className={
                                                    resultStyle[
                                                        "results-tabpane"
                                                    ]
                                                }
                                                justify="center"
                                            >
                                                {questions &&
                                                    examResult.answers &&
                                                    // Object.values(
                                                    questionss.map(
                                                        (question) => {
                                                            return (
                                                                <Col
                                                                    key={
                                                                        question.question
                                                                    }
                                                                    span={19}
                                                                >
                                                                    <Card
                                                                        title={`${question.questionNo}.  ${question.question}`}
                                                                        size="small"
                                                                        extra={
                                                                            <div>
                                                                                {examResult
                                                                                    .answers[
                                                                                    sectionInd +
                                                                                        1
                                                                                ] &&
                                                                                !examResult
                                                                                    .answers[
                                                                                    sectionInd +
                                                                                        1
                                                                                ][
                                                                                    question
                                                                                        .questionNo
                                                                                ] ? (
                                                                                    <span
                                                                                        className={
                                                                                            resultStyle[
                                                                                                "results-tabpane-extra"
                                                                                            ]
                                                                                        }
                                                                                    >
                                                                                        Not
                                                                                        answered
                                                                                    </span>
                                                                                ) : (
                                                                                    ""
                                                                                )}
                                                                                {!examResult
                                                                                    .answers[
                                                                                    sectionInd +
                                                                                        1
                                                                                ] && (
                                                                                    <span
                                                                                        className={
                                                                                            resultStyle[
                                                                                                "results-tabpane-extra"
                                                                                            ]
                                                                                        }
                                                                                    >
                                                                                        Not
                                                                                        answered
                                                                                    </span>
                                                                                )}
                                                                                {examResult
                                                                                    .answers[
                                                                                    sectionInd +
                                                                                        1
                                                                                ] &&
                                                                                examResult
                                                                                    .answers[
                                                                                    sectionInd +
                                                                                        1
                                                                                ][
                                                                                    question
                                                                                        .questionNo
                                                                                ] &&
                                                                                examResult
                                                                                    .answers[
                                                                                    sectionInd +
                                                                                        1
                                                                                ][
                                                                                    question
                                                                                        .questionNo
                                                                                ] ===
                                                                                    question.answer ? (
                                                                                    <CheckOutlined
                                                                                        className={
                                                                                            resultStyle[
                                                                                                "results-tabpane-icon-check"
                                                                                            ]
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    <CloseOutlined
                                                                                        className={
                                                                                            resultStyle[
                                                                                                "results-tabpane-icon-close"
                                                                                            ]
                                                                                        }
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        }
                                                                        className={
                                                                            resultStyle[
                                                                                "results-tabpane-card"
                                                                            ]
                                                                        }
                                                                    >
                                                                        <Row
                                                                            gutter={[
                                                                                10,
                                                                                8,
                                                                            ]}
                                                                        >
                                                                            {/* {question.options &&
                                                                    Object.values(
                                                                        question.options
                                                                    ).map(
                                                                        (
                                                                            option
                                                                        ) => {
                                                                            return (
                                                                                <Col
                                                                                    key={
                                                                                        option
                                                                                    }
                                                                                >
                                                                                    <Card className="exam-detail-inner-card inner-card-padding-small">
                                                                                        {
                                                                                            option
                                                                                        }
                                                                                    </Card>
                                                                                </Col>
                                                                            );
                                                                        }
                                                                    )} */}
                                                                            <Col>
                                                                                <Card
                                                                                    className={`exam-result-inner-card inner-card-padding-small ${
                                                                                        question.options &&
                                                                                        question
                                                                                            .options[
                                                                                            question
                                                                                                .answer
                                                                                        ] ===
                                                                                            question
                                                                                                .options
                                                                                                .a
                                                                                            ? resultStyle.backgroundQuestionAnswer
                                                                                            : ""
                                                                                    } ${
                                                                                        examResult
                                                                                            .answers[
                                                                                            sectionInd +
                                                                                                1
                                                                                        ] &&
                                                                                        question.answer !==
                                                                                            examResult
                                                                                                .answers[
                                                                                                sectionInd +
                                                                                                    1
                                                                                            ][
                                                                                                question
                                                                                                    .questionNo
                                                                                            ] &&
                                                                                        examResult
                                                                                            .answers[
                                                                                            sectionInd +
                                                                                                1
                                                                                        ][
                                                                                            question
                                                                                                .questionNo
                                                                                        ] ===
                                                                                            "a"
                                                                                            ? resultStyle.backgroundRedAnswer
                                                                                            : ""
                                                                                    }`}
                                                                                >
                                                                                    {question.options &&
                                                                                        question
                                                                                            .options
                                                                                            .a}
                                                                                </Card>
                                                                            </Col>
                                                                            <Col>
                                                                                <Card
                                                                                    className={`exam-result-inner-card inner-card-padding-small ${
                                                                                        question.options &&
                                                                                        question
                                                                                            .options[
                                                                                            question
                                                                                                .answer
                                                                                        ] ===
                                                                                            question
                                                                                                .options
                                                                                                .b
                                                                                            ? resultStyle.backgroundQuestionAnswer
                                                                                            : ""
                                                                                    } ${
                                                                                        examResult
                                                                                            .answers[
                                                                                            sectionInd +
                                                                                                1
                                                                                        ] &&
                                                                                        question.answer !==
                                                                                            examResult
                                                                                                .answers[
                                                                                                sectionInd +
                                                                                                    1
                                                                                            ][
                                                                                                question
                                                                                                    .questionNo
                                                                                            ] &&
                                                                                        examResult
                                                                                            .answers[
                                                                                            sectionInd +
                                                                                                1
                                                                                        ][
                                                                                            question
                                                                                                .questionNo
                                                                                        ] ===
                                                                                            "b"
                                                                                            ? resultStyle.backgroundRedAnswer
                                                                                            : ""
                                                                                    }`}
                                                                                >
                                                                                    {
                                                                                        question
                                                                                            .options
                                                                                            ?.b
                                                                                    }
                                                                                </Card>
                                                                            </Col>
                                                                            <Col>
                                                                                <Card
                                                                                    className={`exam-result-inner-card inner-card-padding-small ${
                                                                                        question.options &&
                                                                                        question
                                                                                            .options[
                                                                                            question
                                                                                                .answer
                                                                                        ] ===
                                                                                            question
                                                                                                .options
                                                                                                .c
                                                                                            ? resultStyle.backgroundQuestionAnswer
                                                                                            : ""
                                                                                    } ${
                                                                                        examResult
                                                                                            .answers[
                                                                                            sectionInd +
                                                                                                1
                                                                                        ] &&
                                                                                        question.answer !==
                                                                                            examResult
                                                                                                .answers[
                                                                                                sectionInd +
                                                                                                    1
                                                                                            ][
                                                                                                question
                                                                                                    .questionNo
                                                                                            ] &&
                                                                                        examResult
                                                                                            .answers[
                                                                                            sectionInd +
                                                                                                1
                                                                                        ][
                                                                                            question
                                                                                                .questionNo
                                                                                        ] ===
                                                                                            "c"
                                                                                            ? resultStyle.backgroundRedAnswer
                                                                                            : ""
                                                                                    }`}
                                                                                >
                                                                                    {
                                                                                        question
                                                                                            .options
                                                                                            ?.c
                                                                                    }
                                                                                </Card>
                                                                            </Col>
                                                                            <Col>
                                                                                <Card
                                                                                    className={`exam-result-inner-card inner-card-padding-small ${
                                                                                        question.options &&
                                                                                        question
                                                                                            .options[
                                                                                            question
                                                                                                .answer
                                                                                        ] ===
                                                                                            question
                                                                                                .options
                                                                                                .d
                                                                                            ? resultStyle.backgroundQuestionAnswer
                                                                                            : ""
                                                                                    } ${
                                                                                        examResult
                                                                                            .answers[
                                                                                            sectionInd +
                                                                                                1
                                                                                        ] &&
                                                                                        question.answer !==
                                                                                            examResult
                                                                                                .answers[
                                                                                                sectionInd +
                                                                                                    1
                                                                                            ][
                                                                                                question
                                                                                                    .questionNo
                                                                                            ] &&
                                                                                        examResult
                                                                                            .answers[
                                                                                            sectionInd +
                                                                                                1
                                                                                        ][
                                                                                            question
                                                                                                .questionNo
                                                                                        ] ===
                                                                                            "d"
                                                                                            ? resultStyle.backgroundRedAnswer
                                                                                            : ""
                                                                                    }`}
                                                                                >
                                                                                    {console.log(
                                                                                        // question.answer !==
                                                                                        examResult
                                                                                            .answers[
                                                                                            sectionInd +
                                                                                                1
                                                                                        ] &&
                                                                                            examResult
                                                                                                .answers[
                                                                                                sectionInd +
                                                                                                    1
                                                                                            ][
                                                                                                question
                                                                                                    .questionNo
                                                                                            ]
                                                                                    )}
                                                                                    {console.log(
                                                                                        sectionInd
                                                                                    )}
                                                                                    {
                                                                                        question
                                                                                            .options
                                                                                            ?.d
                                                                                    }
                                                                                </Card>
                                                                            </Col>
                                                                        </Row>
                                                                    </Card>
                                                                </Col>
                                                            );
                                                        }
                                                    )}
                                            </Row>
                                        </TabPane>
                                    );
                                }
                            )}
                    </Tabs>
                </Col>
                <Col>
                    <Pagination
                        defaultCurrent={1}
                        current={pageNo}
                        total={Object.values(questions).length}
                        pageSize={1}
                        pageSizeOptions={[1, 4, 8, 16]}
                        onChange={onPageChange}
                    />
                </Col>
            </Row>
        </AdminRoute>
    );
};

ExamIndex.getLayout = (page) => (
    <CustomLayout type="inside">{page}</CustomLayout>
);

export default ExamIndex;
