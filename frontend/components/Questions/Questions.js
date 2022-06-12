import { Layout, Row, Col } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import QuestionList from "./QuestionList";
import QuestionDetail from "./QuestionDetail";
import allActions from "../../store/actions";
import ExamDetail from "./ExamDetail";
import { EMPTY_QUESTIONS } from "../../store/types";

const Questions = () => {
    const router = useRouter();
    const { id, testId } = router.query;
    const path = router.pathname;

    const { tests } = useSelector((state) => state);
    const { selectedSectionId } = useSelector((state) => state.custom);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(allActions.testActions.fetchTest(id, testId));
        }
    }, [router.query, id, testId]);

    useEffect(() => {
        const getSection = async () => {
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
                } else if (selectedSectionId) {
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
            }
        };
        getSection();
    }, [testId, selectedSectionId, tests]);

    return (
        <Layout
            style={{
                height: "100vh",
            }}
        >
            <Row
                style={{
                    margin: "10px 16px",
                    overflow: "none",
                }}
                gutter={16}
            >
                <Col
                    className="gutter-row display-question-bar"
                    span={9}
                    style={{}}
                >
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

export default Questions;
