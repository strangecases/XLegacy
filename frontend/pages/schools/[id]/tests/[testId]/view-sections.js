import {
    Card,
    Layout,
    Row,
    Col,
    Divider,
    Select,
    Timeline,
    Pagination,
    Spin,
    Empty,
} from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axiosFetch from "../../../../../axiosFetch";
import AdminRoute from "../../../../../components/routes/AdminRoute";
import allActions from "../../../../../store/actions";
import viewSectionStyle from "../../../../../styles/modules/pageStyles/ViewSection.module.css";

const { Option } = Select;

const ViewSections = () => {
    // const [questionss, setQuestionss] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [adminIsAuthor, setAdminIsAuthor] = useState(false);

    const grew = useRef(0);
    const router = useRouter();
    const { id, testId } = router.query;

    const dispatch = useDispatch();

    const { tests, questions } = useSelector((state) => state);
    const { questionsLoading } = useSelector((state) => state.load);
    const { selectedSectionId, selectedSectionName } = useSelector(
        (state) => state.custom
    );

    useEffect(() => {
        if (id && testId) {
            dispatch(allActions.testActions.fetchTest(id, testId));
        }

        const fetchAdmin = async () => {
            try {
                if (testId !== undefined) {
                    const { data } = await axiosFetch.get(
                        `/api/admin-is-author/${testId}`
                    );
                    if (data.ok) {
                        setAdminIsAuthor(true);
                    }
                }
            } catch (err) {
                // console.log(err);
                setAdminIsAuthor(false);
            }
        };
        fetchAdmin();

        return () => {
            dispatch(allActions.customActions.selectedSectionId(undefined));
            dispatch(allActions.customActions.isQuestionsEmpty(false));
            dispatch(allActions.customActions.isQuestionsFull(false));
            dispatch(allActions.customActions.selectedSectionName(""));
            dispatch(allActions.questionActions.emptyQuestions());
        };
    }, [id, testId, dispatch]);

    // useEffect(() => {
    //     if (questions[1].question && questions[1].answer) {
    //         setQuestionss(Object.values(questions).slice(0, 10));
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
            /* sectionData */
            dispatch(
                allActions.customActions.selectedSectionName(
                    tests[testId].sections[0].subject
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

    useEffect(() => {
        grew.current += 1;
    });

    const onSelectChange = async (selectedId, option) => {
        // dispatch(allActions.questionActions.emptyQuestions());
        dispatch(allActions.questionActions.fetchQuestions(testId, selectedId));
        dispatch(allActions.customActions.selectedSectionName(option.children));
        setPageNo(1);
    };

    const onPageChange = (page) => {
        setPageNo(page);
        // let x = Object.values(questions);
        // x = x.slice((page - 1) * pageSize, page * pageSize);
        // setQuestionss(x);
    };

    return (
        <AdminRoute>
            {/* {console.log(questionss[0]?.options)} */}
            <Layout className={viewSectionStyle["view-section-layout"]}>
                <Card className={viewSectionStyle["view-section-card"]}>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={22}>
                            <Card className="exam-detail-inner-card">
                                {/* <p>
                                    <div>
                                        This page shows all the questions from a
                                        section in portrait mode, you can edit
                                        these questions{" "}
                                        <Link
                                            href={`/schools/${id}/tests/${testId}/sections`}
                                        >
                                            <a>here</a>
                                        </Link>
                                        .
                                    </div>
                                    <div>{tests[testId]?.testTitle}</div>
                                </p> */}
                                <Timeline>
                                    <Timeline.Item>
                                        This page shows all the questions from a
                                        section in portrait mode
                                        {adminIsAuthor ? (
                                            <span>
                                                , you can edit these questions{" "}
                                                <Link
                                                    href={`/schools/${id}/tests/${testId}/sections`}
                                                >
                                                    <a
                                                        className={
                                                            viewSectionStyle[
                                                                "view-section-link-color"
                                                            ]
                                                        }
                                                    >
                                                        here
                                                    </a>
                                                </Link>
                                                .
                                            </span>
                                        ) : (
                                            <span>.</span>
                                        )}
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        Test title is{" "}
                                        <Link
                                            href={`/schools/${id}/tests/${testId}`}
                                        >
                                            <a
                                                className={
                                                    viewSectionStyle[
                                                        "view-section-link-color"
                                                    ]
                                                }
                                            >
                                                {tests &&
                                                    tests[testId]?.testTitle}
                                            </a>
                                        </Link>
                                    </Timeline.Item>
                                    <Timeline.Item color="green">
                                        This test is created by{" "}
                                        {tests && tests[testId]?.author?.name}{" "}
                                        on {tests && tests[testId]?.createdAt}
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        {grew.current}
                                    </Timeline.Item>
                                </Timeline>
                                <Divider
                                    orientation="left"
                                    className="inner-divider"
                                >
                                    Select Section
                                </Divider>
                                <Row justify="end">
                                    <Col xs={24} sm={10} md={8}>
                                        <Select
                                            className={
                                                viewSectionStyle[
                                                    "view-section-select"
                                                ]
                                            }
                                            value={selectedSectionName}
                                            onChange={onSelectChange}
                                        >
                                            {tests &&
                                                /* sectionData */
                                                tests[testId]?.sections?.map(
                                                    (section) => {
                                                        return (
                                                            <Option
                                                                value={
                                                                    section._id
                                                                }
                                                                key={
                                                                    section.sectionNo
                                                                }
                                                            >
                                                                {
                                                                    section.subject
                                                                }
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                        </Select>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Divider className="inner-divider" />

                        {questions &&
                            questionsss.map((question) => {
                                return (
                                    <Col
                                        key={question.questionNo}
                                        xs={24}
                                        sm={22}
                                        md={20}
                                    >
                                        <Spin
                                            spinning={questionsLoading}
                                            delay={200}
                                        >
                                            {questionsss[0].question ? (
                                                <Card
                                                    className={
                                                        question.questionNo %
                                                            2 !==
                                                        0
                                                            ? "inner-card-tintblue"
                                                            : "inner-card-nochange"
                                                    }
                                                >
                                                    <>
                                                        <p>
                                                            <span>
                                                                {
                                                                    question.questionNo
                                                                }{" "}
                                                            </span>
                                                            .{" "}
                                                            {question.question}
                                                        </p>
                                                        <Divider className="inner-divider" />

                                                        {question.options &&
                                                            Object.keys(
                                                                question.options
                                                            ).map((key) => (
                                                                <div
                                                                    key={key}
                                                                    className={
                                                                        question.answer ===
                                                                        key
                                                                            ? viewSectionStyle[
                                                                                  "view-section-correct-answer"
                                                                              ]
                                                                            : undefined
                                                                    }
                                                                >
                                                                    {key} .{" "}
                                                                    {
                                                                        question
                                                                            .options[
                                                                            key
                                                                        ]
                                                                    }{" "}
                                                                    {question.answer ===
                                                                        key && (
                                                                        <span>
                                                                            <CheckOutlined
                                                                                className={
                                                                                    viewSectionStyle[
                                                                                        "view-section-check-outlined"
                                                                                    ]
                                                                                }
                                                                            />
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            ))}
                                                    </>
                                                </Card>
                                            ) : (
                                                <Card className="inner-card-tintblue">
                                                    <Empty
                                                        description={
                                                            <span>
                                                                No data, delete
                                                                this section.
                                                            </span>
                                                        }
                                                    />
                                                </Card>
                                            )}
                                        </Spin>
                                    </Col>
                                );
                            })}
                        <Col>
                            <Pagination
                                defaultCurrent={1}
                                current={pageNo}
                                total={Object.values(questions).length}
                                pageSize={10}
                                onChange={onPageChange}
                            />
                        </Col>
                    </Row>
                </Card>
            </Layout>
        </AdminRoute>
    );
};

export default ViewSections;
