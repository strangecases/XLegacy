import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Row, Col, Card, Button, Badge, Space } from "antd";
import { useEffect } from "react";
import allActions from "../../store/actions";
import { EMPTY_ANSWERS, EMPTY_QUESTIONS } from "../../store/types";

const QuestionList = () => {
    const router = useRouter();
    const { id, testId } = router.query;
    const path = router.pathname;

    const { tests } = useSelector((state) => state);
    const { questions } = useSelector((state) => state);
    const { answers } = useSelector((state) => state);
    const { examId } = useSelector((state) => state.exam);

    const { selectedQuestion, selectedSectionId, selectedSectionNo } =
        useSelector((state) => state.custom);

    const dispatch = useDispatch();

    let questionsList;
    let sections;

    // useEffect(() => {
    //     if (questions) {
    //         questionsList = Object.values(questions);
    //     }
    //     console.log(questionsList);
    // }, [questions]);

    if (testId !== null && tests[testId]) {
        sections = tests[testId].sectionData;
    }

    if (questions) {
        questionsList = Object.values(questions);
    }

    const onQuestionClick = (quesionNo) => {
        dispatch(allActions.customActions.selectedQuestion(quesionNo));
    };

    const onSectionClick = async (sectionId, sectionNo) => {
        if (sectionId !== selectedSectionId) {
            const list = Object.values(questions);
            await axios.patch(
                `/api/tests/${testId}/sections/${selectedSectionId}`,
                { questions: list }
            );
            console.log("hiii");
            dispatch(allActions.customActions.selectedSectionId(sectionId));
            dispatch(allActions.customActions.selectedSectionNo(sectionNo));
            dispatch(allActions.questionActions.emptyQuestions());
            dispatch(allActions.customActions.selectedQuestion(1));
        }
    };

    const onSectionExamClick = async (sectionId, sectionNo) => {
        if (sectionId !== selectedSectionId) {
            dispatch(
                allActions.examActions.onSectionChange(
                    id,
                    testId,
                    sectionId,
                    sectionNo
                )
            );
            // const answersObj = {
            //     selectedSectionId,
            //     selectedSectionNo,
            //     answers,
            // };

            // const exam = await axios.patch(
            //     `/api/schools/${id}/tests/${testId}/exams/${examId}`,
            //     answersObj
            // );
            // // dispatch({ type: "FETCH_ANSWERS", payload: exam });

            // dispatch(allActions.customActions.selectedSectionId(sectionId));
            // dispatch(allActions.customActions.selectedSectionNo(sectionNo));
            // dispatch(allActions.answerActions.emptyAnswers());
            // dispatch(allActions.questionActions.emptyQuestions());
            // dispatch(
            //     allActions.answerActions.fetchAnwers(
            //         exam.data.answers[sectionNo]
            //     )
            // );
            // dispatch(allActions.customActions.selectedQuestion(1));
        }
    };

    const onMapQuestions = () => {
        return questionsList.map((question) => {
            return (
                <Col
                    key={question.questionNo}
                    // offset={1}
                    xl={4}
                    lg={6}
                    sm={8}
                    span={4}
                    onClick={() => onQuestionClick(question.questionNo)}
                    // style={{ marginLeft: 10 }}
                >
                    <Badge
                        status="success"
                        dot={
                            path && path.includes("tests")
                                ? question.answer
                                : answers[question.questionNo]
                        }
                    >
                        <Button
                            type={
                                selectedQuestion === question.questionNo
                                    ? "primary"
                                    : ""
                            }
                        >
                            {question.questionNo <= 9
                                ? `0${question.questionNo}`
                                : question.questionNo}
                        </Button>
                    </Badge>
                </Col>
            );
        });
    };

    const onMapSections = () => {
        return sections.map((section) => {
            return (
                <Col key={section.sectionId} offset={0} xl={12}>
                    <Button
                        type={
                            selectedSectionId === section.sectionId
                                ? "primary"
                                : ""
                        }
                        style={{ width: "100%", overflow: "hidden" }}
                        onClick={
                            path && path.includes("tests")
                                ? () =>
                                      onSectionClick(
                                          section.sectionId,
                                          section.sectionNo
                                      )
                                : () =>
                                      onSectionExamClick(
                                          section.sectionId,
                                          section.sectionNo
                                      )
                        }
                    >
                        {section.subject}
                    </Button>
                </Col>
            );
        });
    };

    return (
        <>
            <Card
                bordered={false}
                size="small"
                title="Question Numbers"
                className="question-list-card"
                // style={{
                //     margin: "1vh 0.5vh",
                //     overflowY: "auto",
                //     // height: "52vh",
                // }}
            >
                <Card
                    type="inner"
                    bordered={false}
                    // style={{
                    //     padding: "2.5vh",
                    //     background: "#f0efed",
                    //     borderRadius: "6px",
                    // }}
                    className="inner-card-padding-two"
                >
                    <Row gutter={[16, 16]}>
                        {questionsList && onMapQuestions()}
                    </Row>
                </Card>
            </Card>
            <Card
                bordered={false}
                size="small"
                title="Sections"
                // style={{
                //     margin: "1vh 0.5vh",
                //     overflowY: "auto",
                // }}
                className="question-list-card"
            >
                <Card
                    type="inner"
                    bordered={false}
                    // style={{
                    //     padding: "2.5vh",
                    //     background: "#f0efed",
                    //     borderRadius: "6px",
                    // }}
                    className="inner-card-padding-two"
                >
                    <Row
                        justify="center"
                        gutter={[8, 16]}
                        style={{ overflow: "hidden" }}
                    >
                        {/* <Space size={[60, 16]} align="center" wrap> */}
                        {sections && onMapSections()}
                        {/* </Space> */}
                    </Row>
                </Card>
            </Card>
        </>
    );
};

export default QuestionList;
