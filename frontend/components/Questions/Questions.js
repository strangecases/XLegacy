import { Layout, Row, Col } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import QuestionList from "./QuestionList";
import QuestionDetail from "./QuestionDetail";
import allActions from "../../store/actions";
import ExamDetail from "./ExamDetail";

const Questions = () => {
    const router = useRouter();
    const { id } = router.query;
    const path = router.pathname;

    const { tests } = useSelector((state) => state);
    const { selectedSectionId } = useSelector((state) => state.custom);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(allActions.testActions.fetchTest(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        const getSection = async () => {
            if (id !== undefined && tests[id]) {
                if (!selectedSectionId) {
                    console.log(tests[id].sectionData[0].sectionId);
                    dispatch(
                        allActions.customActions.selectedSectionId(
                            tests[id].sectionData[0].sectionId
                        )
                    );
                    console.log("hi", selectedSectionId);
                } else if (selectedSectionId) {
                    dispatch(
                        allActions.questionActions.fetchQuestions(
                            id,
                            selectedSectionId
                        )
                    );
                    console.log("hello", selectedSectionId);
                }
            }
        };
        getSection();
    }, [id, dispatch, selectedSectionId, tests]);

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
                    {path && path.includes("tests") ? (
                        <QuestionDetail />
                    ) : (
                        <ExamDetail />
                    )}
                </Col>
            </Row>
        </Layout>
    );
};

export default Questions;
