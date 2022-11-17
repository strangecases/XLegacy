import { Layout, Row, Col, Button, Drawer, Alert } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import QuestionList from "./QuestionList";
import QuestionDetail from "./QuestionDetail";
import allActions from "../../store/actions";
import ExamDetail from "./ExamDetail";
import { EMPTY_QUESTIONS } from "../../store/types";
import questionStyle from "../../styles/modules/componentStyles/Questions.module.css";

const QuestionTests = () => {
    const router = useRouter();
    const { id, testId } = router.query;
    const path = router.pathname;

    const { tests } = useSelector((state) => state);
    const { selectedSectionId, isQuestionsEmpty } = useSelector(
        (state) => state.custom
    );
    const { questionsDrawer } = useSelector((state) => state);

    const dispatch = useDispatch();

    useEffect(() => {
        if (testId !== undefined) {
            dispatch(allActions.testActions.fetchTest(id, testId));
        }
    }, [router.query, id, testId, dispatch]);

    useEffect(() => {
        if (testId !== undefined && tests[testId]) {
            if (!selectedSectionId) {
                /* sectionData-- */
                // console.log(tests[testId].sections[0]._id);
                /* sectionData-- */
                dispatch(
                    allActions.customActions.selectedSectionId(
                        tests[testId].sections[0]._id
                    )
                );
                dispatch(allActions.customActions.selectedSectionNo(1));
                // dispatch(
                //     allActions.customActions.selectedSectionNo(
                //         tests[id].sectionData[0].sectionNo
                //     )
                // );
                // console.log("hi", selectedSectionId);
            }
        }
    }, [testId, selectedSectionId, tests, dispatch]);

    useEffect(() => {
        if (testId && selectedSectionId) {
            dispatch({ type: EMPTY_QUESTIONS });
            // dispatch(allActions.customActions.selectedQuestion(1));
            dispatch(
                allActions.questionActions.fetchQuestions(
                    testId,
                    selectedSectionId
                )
            );
            dispatch(allActions.customActions.selectedQuestion(1));
            // console.log("hello", selectedSectionId);
        }

        return () => {
            dispatch(allActions.questionActions.emptyQuestions());
            dispatch(allActions.customActions.selectedQuestion(1));
            dispatch(allActions.customActions.isQuestionsEmpty(false));
            dispatch(allActions.customActions.isQuestionsFull(false));
        };
    }, [testId, selectedSectionId, dispatch]);

    const showDrawer = () => {
        dispatch(allActions.questionsDrawerActions.questionsDrawer(true));
    };

    const onClose = () => {
        dispatch(allActions.questionsDrawerActions.questionsDrawer(false));
    };

    return (
        <Layout className={questionStyle["questions-layout"]}>
            <Button
                type="primary"
                shape="circle"
                onClick={showDrawer}
                className={questionStyle["questions-button-round"]}
            >
                <FormOutlined
                    className={questionStyle["questions-button-round-icon"]}
                />
            </Button>
            <Row
                // justify="center"
                className={questionStyle["questions-row"]}
                gutter={4}
            >
                <Col
                    className="gutter-row display-question-bar"
                    md={10}
                    lg={9}
                    span={9}
                >
                    {isQuestionsEmpty && path && !path.includes("exams") && (
                        <Alert
                            type="error"
                            message="Either you write some questions or delete this section."
                            className={
                                questionStyle["questions-row-alert-margin"]
                            }
                        />
                    )}
                    <QuestionList />
                </Col>
                <Col
                    className={`gutter-row ${questionStyle["questions-row-details"]}`}
                    xs={24}
                    md={14}
                    lg={15}
                    span={15}
                >
                    {path && path.includes("exams") ? (
                        <ExamDetail />
                    ) : (
                        <QuestionDetail />
                    )}
                </Col>
            </Row>
            <Drawer
                title="select questions"
                placement="bottom"
                onClose={onClose}
                open={questionsDrawer}
                height="80%"
                headerStyle={{ display: "none" }}
                className={questionStyle["questions-drawer"]}
            >
                <div className={questionStyle["questions-drawer-div"]}>
                    {isQuestionsEmpty && path && !path.includes("exams") && (
                        <Alert
                            type="error"
                            message="Either you write some questions or delete this section."
                            className={
                                questionStyle[
                                    "questions-row-alert-margin-drawer"
                                ]
                            }
                        />
                    )}
                    <QuestionList />
                </div>
            </Drawer>
        </Layout>
    );
};

export default QuestionTests;
