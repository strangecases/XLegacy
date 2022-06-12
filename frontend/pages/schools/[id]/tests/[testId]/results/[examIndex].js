import { Tabs, Card, Row, Col, Pagination } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomLayout from "../../../../../../components/nav/CustomLayout";
import allActions from "../../../../../../store/actions";
import homeStyles from "../../../../../../styles/modules/Home.module.css";
import AdminRoute from "../../../../../../components/routes/AdminRoute";

const { TabPane } = Tabs;

const ExamIndex = () => {
    const [questionss, setQuestionss] = useState([]);
    const [pageNo, setPageNo] = useState("");

    const grew = useRef(0);
    const router = useRouter();
    const { id, testId, examIndex } = router.query;

    const { tests, questions } = useSelector((state) => state);
    const { examResult } = useSelector((state) => state.exam);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.testActions.fetchTest(id, testId));
        dispatch(allActions.examActions.examResult(id, testId, examIndex));
    }, [id, testId, examIndex]);

    useEffect(() => {
        setQuestionss(Object.values(questions).slice(0, 1));
        setPageNo(1);
    }, [questions]);

    useEffect(() => {
        if (tests[testId]) {
            dispatch(allActions.questionActions.emptyQuestions());
            dispatch(
                allActions.questionActions.fetchQuestions(
                    testId,
                    tests[testId].sectionData[0].sectionId
                )
            );
        }
        // return () => {
        //     dispatch(allActions.questionActions.emptyQuestions());
        // };
    }, [testId, tests]);

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
            {/* <h1 style={{ textAlign: "center" }}>Exam Index</h1> */}
            <Row gutter={[8, 32]} justify="center">
                <Col span={20}>
                    <Card
                        title={examResult?.studentName?.toUpperCase()}
                        size="small"
                        style={{ marginBottom: 20, borderRadius: 6 }}
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
                            <strong style={{ color: "red" }}>
                                {examResult.marks}
                            </strong>{" "}
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
                                                style={{ marginTop: -12 }}
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
                                                                                        style={{
                                                                                            color: "red",
                                                                                            fontSize: 12,
                                                                                            opacity: 0.5,
                                                                                        }}
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
                                                                                        style={{
                                                                                            color: "red",
                                                                                            fontSize: 12,
                                                                                            opacity: 0.5,
                                                                                        }}
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
                                                                                        style={{
                                                                                            marginLeft: 10,
                                                                                            verticalAlign: 0,
                                                                                            color: "green",
                                                                                            fontSize: 18,
                                                                                        }}
                                                                                    />
                                                                                ) : (
                                                                                    <CloseOutlined
                                                                                        style={{
                                                                                            marginLeft: 10,
                                                                                            verticalAlign: 0,
                                                                                            color: "red",
                                                                                            fontSize: 18,
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        }
                                                                        style={{
                                                                            minHeight: 120,
                                                                        }}
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
                                                                                            ? homeStyles.backgroundQuestionAnswer
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
                                                                                            ? homeStyles.backgroundRedAnswer
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
                                                                                            ? homeStyles.backgroundQuestionAnswer
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
                                                                                            ? homeStyles.backgroundRedAnswer
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
                                                                                            ? homeStyles.backgroundQuestionAnswer
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
                                                                                            ? homeStyles.backgroundRedAnswer
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
                                                                                            ? homeStyles.backgroundQuestionAnswer
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
                                                                                            ? homeStyles.backgroundRedAnswer
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
