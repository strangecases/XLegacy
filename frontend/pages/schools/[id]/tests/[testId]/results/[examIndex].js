import { Tabs, Card, Row, Col, Pagination, Spin, Empty } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminCustomLayout from "../../../../../../components/nav/adminCustom/AdminCustomLayout";
import allActions from "../../../../../../store/actions";
import AdminRoute from "../../../../../../components/routes/AdminRoute";
import resultStyle from "../../../../../../styles/modules/pageStyles/Results.module.css";
import { stringOverflow } from "../../../../../../utils";

const ExamIndex = () => {
    // const [questionss, setQuestionss] = useState([]);
    const [pageNo, setPageNo] = useState(1);

    // const grew = useRef(0);
    const router = useRouter();
    const { id, testId, examIndex } = router.query;

    const { tests, questions } = useSelector((state) => state);
    const { examResult } = useSelector((state) => state.exam);
    const { questionsLoading } = useSelector((state) => state.load);
    const { selectedSectionId } = useSelector((state) => state.custom);

    const dispatch = useDispatch();

    useEffect(() => {
        if (id && testId && examIndex) {
            dispatch(allActions.testActions.fetchTest(id, testId));
            dispatch(allActions.examActions.examResult(id, testId, examIndex));
        }

        return () => {
            dispatch(allActions.customActions.selectedSectionId(undefined));
            dispatch(allActions.customActions.isQuestionsEmpty(false));
            dispatch(allActions.customActions.isQuestionsFull(false));
            dispatch(allActions.questionActions.emptyQuestions());
        };
    }, [id, testId, examIndex, dispatch]);

    // useEffect(() => {
    //     if (questions[1].question && questions[1].answer) {
    //         setQuestionss(Object.values(questions).slice(0, 8));
    //         setPageNo(1);
    //     }
    // }, [questions]);

    const questionsss = useMemo(() => {
        return Object.values(questions).slice((pageNo - 1) * 8, pageNo * 8);
    }, [questions, pageNo]);

    useEffect(() => {
        if (tests[testId]) {
            /* sectionData */
            dispatch(
                allActions.customActions.selectedSectionId(
                    tests[testId].sections[0]._id
                )
            );
        }
    }, [tests, testId, dispatch]);

    useEffect(() => {
        if (testId && selectedSectionId) {
            // dispatch(allActions.questionActions.emptyQuestions());
            dispatch(
                allActions.questionActions.fetchQuestions(
                    testId,
                    selectedSectionId
                )
            );
            // console.log("thrice");
        }
        // return () => {
        //     dispatch(allActions.questionActions.emptyQuestions());
        // };
    }, [testId, selectedSectionId, dispatch]);

    // useEffect(() => {
    //     grew.current += 1;
    // });

    const onTabChange = async (active) => {
        dispatch(allActions.questionActions.fetchQuestions(testId, active));
        setPageNo(1);
    };

    const onPageChange = (page) => {
        setPageNo(page);
        // let x = Object.values(questions);
        // x = x.slice((page - 1) * pageSize, page * pageSize);
        // setQuestionss(x);
        // questionsss = x;
        // console.log(questionsss);
    };

    return (
        <AdminRoute>
            <Row gutter={[8, 32]} justify="center">
                <Col xs={22} span={20}>
                    <Card
                        title={examResult?.studentName?.toUpperCase()}
                        size="small"
                        className={resultStyle["results-card"]}
                        hoverable
                        bordered={false}
                        // extra={grew.current}
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
                        /* sectionData */
                        defaultActiveKey={
                            tests && tests[testId]?.sections[0]?._id
                        }
                        type="card"
                        size="small"
                        tabPosition="top"
                        centered
                        onChange={onTabChange}
                        className={resultStyle["results-tab"]}
                        items={
                            tests &&
                            tests[testId]?.sections?.map(
                                (section, sectionInd) => {
                                    return {
                                        label: stringOverflow(
                                            section.subject,
                                            6
                                        ),
                                        key: section._id,
                                        children: (
                                            <Row
                                                gutter={[16, 8]}
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

                                                    questionsss.map(
                                                        (question) => {
                                                            return (
                                                                <Col
                                                                    key={
                                                                        question.questionNo
                                                                    }
                                                                    xs={22}
                                                                    sm={19}
                                                                >
                                                                    <Spin
                                                                        spinning={
                                                                            questionsLoading
                                                                        }
                                                                        delay={
                                                                            200
                                                                        }
                                                                    >
                                                                        {questions[1]
                                                                            .question ? (
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
                                                                                className={`inner-card-tintblue ${resultStyle["results-tabpane-card"]}`}
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
                                                                                                question &&
                                                                                                question.answer ===
                                                                                                    "a"
                                                                                                    ? resultStyle.backgroundQuestionAnswer
                                                                                                    : undefined
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
                                                                                                    : undefined
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
                                                                                                question &&
                                                                                                question.answer ===
                                                                                                    "b"
                                                                                                    ? resultStyle.backgroundQuestionAnswer
                                                                                                    : undefined
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
                                                                                                    : undefined
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
                                                                                                question &&
                                                                                                question.answer ===
                                                                                                    "c"
                                                                                                    ? resultStyle.backgroundQuestionAnswer
                                                                                                    : undefined
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
                                                                                                    : undefined
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
                                                                                                question &&
                                                                                                question.answer ===
                                                                                                    "d"
                                                                                                    ? resultStyle.backgroundQuestionAnswer
                                                                                                    : undefined
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
                                                                                                    : undefined
                                                                                            }`}
                                                                                        >
                                                                                            {/* {console.log(
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
                                                                                        )} */}
                                                                                            {
                                                                                                question
                                                                                                    .options
                                                                                                    ?.d
                                                                                            }
                                                                                        </Card>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Card>
                                                                        ) : (
                                                                            <Card className="inner-card-padding-small">
                                                                                <Empty
                                                                                    description={
                                                                                        <span>
                                                                                            No
                                                                                            data,
                                                                                            delete
                                                                                            this
                                                                                            section.
                                                                                        </span>
                                                                                    }
                                                                                />
                                                                            </Card>
                                                                        )}
                                                                    </Spin>
                                                                </Col>
                                                            );
                                                        }
                                                    )}
                                            </Row>
                                        ),
                                    };
                                }
                            )
                        }
                    />
                </Col>
                <Col>
                    <Pagination
                        size="small"
                        defaultCurrent={1}
                        current={pageNo}
                        total={Object.values(questions).length}
                        pageSize={8}
                        // pageSizeOptions={[1, 4, 8, 16]}
                        onChange={onPageChange}
                    />
                </Col>
            </Row>
        </AdminRoute>
    );
};

ExamIndex.getLayout = (page) => (
    <AdminCustomLayout type="inside">{page}</AdminCustomLayout>
);

export default ExamIndex;
