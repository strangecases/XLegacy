import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Row, Col, Card, Button, Badge } from "antd";
import allActions from "../../store/actions";
import { EMPTY_ANSWERS, EMPTY_QUESTIONS } from "../../store/types";

const QuestionList = () => {
    const router = useRouter();
    const { id } = router.query;
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

    if (id !== null && tests[id]) {
        sections = tests[id].sectionData;
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
                `/api/prepare/tests/${id}/sections/${selectedSectionId}`,
                { questions: list }
            );
            console.log("hiii");
            dispatch(allActions.customActions.selectedSectionId(sectionId));
            dispatch(allActions.customActions.selectedSectionNo(sectionNo));
            dispatch({ type: EMPTY_QUESTIONS });
            dispatch(allActions.customActions.selectedQuestion(1));
        }
    };

    const onSectionExamClick = async (sectionId, sectionNo) => {
        if (sectionId !== selectedSectionId) {
            const answersObj = {
                selectedSectionId,
                selectedSectionNo,
                answers,
            };

            const exam = await axios.patch(
                `/api/prepare/tests/${id}/exams/${examId}`,

                answersObj
            );
            // dispatch({ type: "FETCH_ANSWERS", payload: exam });

            dispatch(allActions.customActions.selectedSectionId(sectionId));
            dispatch(allActions.customActions.selectedSectionNo(sectionNo));
            dispatch({ type: EMPTY_ANSWERS });
            dispatch({ type: EMPTY_QUESTIONS });
            dispatch(
                allActions.answerActions.fetchAnwers(
                    exam.data.answers[sectionNo]
                )
            );
            dispatch(allActions.customActions.selectedQuestion(1));
        }
    };

    const onMapQuestions = () => {
        return questionsList.map((question) => {
            return (
                <Col
                    key={question.questionNo}
                    lg={4}
                    sm={8}
                    span={4}
                    onClick={() => onQuestionClick(question.questionNo)}
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
                <Col key={section.sectionId} xl={12} justify="start">
                    <Button
                        type={
                            selectedSectionId === section.sectionId
                                ? "primary"
                                : ""
                        }
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
                        {/* <Col span={4} onClick={() => onSubmit(1)}>
                        <Button type="">01</Button>
                    </Col>
                    <Col span={4}>
                        <Badge dot status="success">
                            <Button type="primary">02</Button>
                        </Badge>
                    </Col>
                    <Col span={4}>
                        <Button type="">03</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">04</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">05</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">06</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">07</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">08</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">09</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">10</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">11</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">12</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">13</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">14</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">15</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">16</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">17</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">18</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">19</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">20</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">21</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">22</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">23</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">24</Button>
                    </Col>
                    <Col span={4}>
                        <Button type="">25</Button>
                    </Col> */}
                    </Row>
                </Card>
            </Card>
            <Card
                bordered={false}
                // style={{
                //     margin: "1vh 0.5vh",
                //     overflowY: "auto",
                // }}
                className="question-list-card"
            >
                {/* <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p> */}
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
                    <Row gutter={[8, 16]} style={{ overflow: "hidden" }}>
                        {sections && onMapSections()}
                    </Row>
                </Card>
            </Card>
        </>
    );
};

export default QuestionList;
