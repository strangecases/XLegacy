import { Layout, Row, Col } from "antd";
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
    const { selectedSectionId } = useSelector((state) => state.custom);
    const dispatch = useDispatch();

    useEffect(() => {
        if (testId !== undefined) {
            dispatch(allActions.testActions.fetchTest(id, testId));
        }
    }, [router.query, id, testId]);

    useEffect(() => {
        if (testId !== undefined && tests[testId]) {
            if (!selectedSectionId) {
                console.log(tests[testId].sectionData[0].sectionId);
                dispatch(
                    allActions.customActions.selectedSectionId(
                        tests[testId].sectionData[0].sectionId
                    )
                );
                // dispatch(
                //     allActions.customActions.selectedSectionNo(
                //         tests[id].sectionData[0].sectionNo
                //     )
                // );
                console.log("hi", selectedSectionId);
            }
        }
    }, [testId, selectedSectionId, tests]);

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
            console.log("hello", selectedSectionId);
        }

        return () => {
            dispatch(allActions.questionActions.emptyQuestions());
        };
    }, [testId, selectedSectionId]);

    return (
        <Layout className={questionStyle["questions-layout"]}>
            <Row className={questionStyle["questions-row"]} gutter={16}>
                <Col className="gutter-row display-question-bar" span={9}>
                    <QuestionList />
                </Col>
                <Col className="gutter-row" xs={24} md={15} span={15}>
                    {path && path.includes("exams") ? (
                        <ExamDetail />
                    ) : (
                        <QuestionDetail />
                    )}
                </Col>
            </Row>
        </Layout>
    );
};

export default QuestionTests;
