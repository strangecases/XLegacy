import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Badge } from "antd";
import allActions from "../../store/actions";
import questionStyle from "../../styles/modules/componentStyles/Questions.module.css";

const QuestionList = () => {
    const router = useRouter();
    const { id, testId } = router.query;
    const path = router.pathname;

    const { tests } = useSelector((state) => state);
    const { questions } = useSelector((state) => state);
    const { answers } = useSelector((state) => state);

    const { selectedQuestion, selectedSectionId } = useSelector(
        (state) => state.custom
    );

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
            dispatch(
                allActions.questionActions.onSectionClick({
                    testId,
                    sectionId,
                    sectionNo,
                })
            );
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
                <Col key={section.sectionId} offset={0} md={12}>
                    <Button
                        type={
                            selectedSectionId === section.sectionId
                                ? "primary"
                                : ""
                        }
                        className={questionStyle["question-list-button"]}
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
            >
                <Card
                    type="inner"
                    bordered={false}
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
                className="question-list-card"
            >
                <Card
                    type="inner"
                    bordered={false}
                    className="inner-card-padding-two"
                >
                    <Row
                        justify="start"
                        gutter={[8, 16]}
                        className={questionStyle["question-list-overflow"]}
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
